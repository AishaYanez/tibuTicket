import React, { useEffect, useState } from 'react';
import './main.css';
import Menu from '../../components/Menu/menu';
import ListCard from '../../components/UserListCard/ListCard';

function Main({ queues }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establecer conexión WebSocket
    const ws = new WebSocket('ws://localhost:4000/cable');
    ws.onopen = () => {
      console.log('WebSocket connected');
      setSocket(ws);
    };

    // Registrarse en el Service Worker y suscribirse a las notificaciones VAPID
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('/serviceworker.js')
        .then(function (reg) {
          console.log('Service worker registered', reg);

          fetch('http://localhost:4000/webpush/vapid_public_key')
            .then(response => response.json())
            .then(data => {
              if (data.vapid_public_key) {
                const base64String = data.vapid_public_key.replace(/-/g, '+').replace(/_/g, '/');
                try {
                  const vapidPublicKey = new Uint8Array(atob(base64String).split('').map(char => char.charCodeAt(0)));
                  console.log('VAPID Public Key:', vapidPublicKey);

                  // Suscribir al usuario cuando el componente se monta
                  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
                    subscribeUser(serviceWorkerRegistration, vapidPublicKey);
                  });

                } catch (error) {
                  console.error('Error processing VAPID public key:', error);
                }
              } else {
                console.error('VAPID public key not found in response');
              }
            })
            .catch(error => console.error('Error fetching VAPID public key:', error));
        })
        .catch(function (err) {
          console.error('Error during service worker registration:', err);
        });
    } else {
      console.error('Service worker is not supported in this browser');
    }
  }, []);

  function subscribeUser(serviceWorkerRegistration, vapidPublicKey) {
    serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey
    })
      .then(function (subscription) {
        fetch('http://localhost:4000/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        })
          .then(r => {
            if (!r.ok) {
              throw new Error('Network response was not ok');
            }
            return r.json();
          })
          .then(data => {
            console.log('Subscription successful:', data);
            // Enviar una notificación de prueba al suscribirse con éxito
            sendTestNotification();
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          });
      })
      .catch((err) => {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Failed to subscribe the user:', err);
        }
      });
  }

  function sendTestNotification() {
    fetch('http://localhost:4000/notifications/send_test_notification')
      .then(response => response.json())
      .then(data => {
        console.log('Test notification sent:', data);
        // Enviar un comando a la consola de Rails si la notificación se envía correctamente
        sendCommandToRailsConsole();
      })
      .catch(error => {
        console.error('Error sending test notification:', error);
      });
  }

  function sendCommandToRailsConsole() {
    if (socket) {
      const command = { type: 'send_command_to_rails_console', command: 'WebpushNotification.last.push("Session is logged in!")' };
      socket.send(JSON.stringify(command));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  return (
    <>
      <div className="main-container">
        <Menu />
        <div className='Usercardcontainer'>
          {queues.map((q) => (
            <ListCard key={q.list_description.id} queue={q} className="Items" />
          ))}
        </div>
      </div>
    </>
  );
}

export default Main;

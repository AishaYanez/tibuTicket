import React, { useEffect, useState } from 'react';
import './main.css';
import Menu from '../../components/Menu/menu';
import AdminListCard from '../../components/AdminListCard/ListCard';
import { Button, Input, Upload, message } from 'antd';
import anime from 'animejs/lib/anime.es.js';
import ListService from '../../services/ListService/list.service';
import { useNavigate } from 'react-router-dom';

function Main({ queues }) {
  const nav = useNavigate();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [newQueue, setNewQueue] = useState({ name: "" });
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {

  }, []);

  const handleMouseDown = () => {
    setButtonPressed(true);
    anime({
      targets: '.Add .ant-btn',
      backgroundColor: '#E6DED3',
      duration: 300,
    });
  };

  const handleMouseUp = () => {
    setButtonPressed(false);
    anime({
      targets: '.Add .ant-btn',
      backgroundColor: '#BBC0BA',
      duration: 300,
    });
  };

  const changeData = () => {
    setNewQueue({
      name: document.getElementById('listName').value || ""
    });
  }

  const formattedQueue = () => {
    const listData = new FormData();

    listData.append('list[list_name]', newQueue.name);

    imageUploaded && listData.append('list[list_image]', imageFile);

    return listData;
  }


  const handleChange = info => {
    if (info.fileList.length > 1) {
      info.fileList.shift();
    }

    const file = info.file.originFileObj;

    if (file) {
      setImageFile(file);
    } else {
      setImageFile(null);
    }

    setImageUploaded(info.fileList.length > 0);
  };

  const logoutActions = () => {
    message.error('Inicia sesión para crear listas')
    localStorage.removeItem('token');
    localStorage.removeItem('user_image');
    localStorage.removeItem('lastLoginTime');
    nav('/');
  };

  const createQueue = (event) => {
    event.preventDefault();
    localStorage.getItem('token') ?
      ListService.createList(formattedQueue()).then(r => {
        message.success(r.data.status.message);
      }).catch(err => {
        const mess = err.response ? err.response.data.status.message : err.message;
        message.error(mess);
      }) : logoutActions();
    setFormVisible(!formVisible)
  };

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
        {formVisible &&
          <form onSubmit={createQueue} className='ListForm form'>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              maxCount={1}
              onChange={handleChange}
            >
              {imageUploaded ? null : (
                <img alt="" />
              )}
            </Upload>
            <Input id='listName' onChange={changeData} value={newQueue.name} type="text" placeholder="Escribe aqui el nombre de la lista" required />
            <Button type="primary" htmlType="submit" style={{ borderColor: 'black', backgroundColor: '#BBC0BA', color: 'white' }}>Enter</Button>
          </form>
        }

        <div className='Admincardcontainer'>
          {queues && queues.map((q) => (
            <AdminListCard key={q.list_description.id} queue={q} className="Items" />
          ))}
        </div>

        <div className="Group4">
          <Button
            className="Add"
            style={{
              backgroundColor: buttonPressed ? '#E6DED3' : '#BBC0BA',
              color: buttonPressed ? 'black' : 'white'
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={() => { setFormVisible(!formVisible) }}
          >
            <div className="Title">+</div>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Main;
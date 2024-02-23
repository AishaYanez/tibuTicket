import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import anime from 'animejs/lib/anime.es.js';
import './auth.css';
import SignUp from "../../components/SignUp/signUp";
import SignIn from "../../components/SignIn/signIn";

function Authpage() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(prevState => !prevState);
  };

  useEffect(() => {

    anime({
      targets: '.triangles',
      translateY: isSignIn ? 0 : 285,
      rotateX: isSignIn ? '0' : '180deg',
      duration: 800,
      easing: 'easeInSine'
    });

    anime({
      targets: '.form-container',
      translateY: isSignIn ? 0 : -350,
      duration: 800,
      easing: 'easeInSine'
    });

    anime({
      targets: '.back-container',
      translateY: isSignIn ? 0 : 560,
      duration: 800,
      easing: 'easeInSine'
    });

    // Service Worker Registration and VAPID Subscription
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('/serviceworker.js')
        .then(function (reg) {
          console.log('Service worker registered', reg);

          fetch('http://localhost:4000/webpush/vapid_public_key')
            .then(response => response.json())
            .then(data => {
              console.log('Data received:', data);
              if (data.vapid_public_key) {
                const base64String = data.vapid_public_key.replace(/-/g, '+').replace(/_/g, '/');
                try {
                  const vapidPublicKey = new Uint8Array(atob(base64String).split('').map(char => char.charCodeAt(0)));
                  console.log('VAPID Public Key:', vapidPublicKey);


                  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
                    serviceWorkerRegistration.pushManager.getSubscription().then((subscription) => {
                      if (subscription) {

                        subscription.unsubscribe().then((successful) => {
                          console.log('Unsubscription successful:', successful);
                          subscribeUser(serviceWorkerRegistration, vapidPublicKey);
                        }).catch((error) => {
                          console.error('Unsubscription failed:', error);
                        });
                      } else {

                        subscribeUser(serviceWorkerRegistration, vapidPublicKey);
                      }
                    });
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
  }, [isSignIn]); 


  function subscribeUser(serviceWorkerRegistration, vapidPublicKey) {
    serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey
    })
    .then(function(subscription) {
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

  return (
    <div className='auth-container'>
      <div className='back-container'>
        <div className='changeButton'>
          <Button onClick={toggleForm} type="primary" ghost style={{ borderColor: 'white', backgroundColor: '#BBC0BA', color: 'white' }} size='large'>
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
        <svg className='svg'>
          <rect id='rect1' width={'100%'} height={'100%'} fill='#E6DED3' strokeWidth='1' stroke='black' />
          <polygon id='tri1' points="0 0, 150 0, 0 100" fill='#FDF0E7' strokeWidth='1' stroke='black' className='triangles' />
          <polygon id='tri2' points="400 0, 250 0, 400 100" fill='#BBC0BA' strokeWidth='1' stroke='black' className='triangles' />
        </svg>
      </div>
      <div className='form-container'>{isSignIn ? <SignIn /> : <SignUp />}</div>
    </div>
  );
}

export default Authpage;

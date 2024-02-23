self.addEventListener('push', function(event) {
  console.log('Push received', event);

  const options = {
    body: event.data.text(),
    icon: '/path/to/icon.png',
    badge: '/path/to/badge.png'
  };

  event.waitUntil(
    self.registration.showNotification('Log In Successful!!', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked', event);
  event.notification.close();


});

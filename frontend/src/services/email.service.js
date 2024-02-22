// const nodemailer = require('nodemailer');
// const fetch = require('node-fetch');

// async function fetchActivities() {
//     const response = await fetch('http://localhost:4000/api/v1/activities');
//     if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
//     }
//     const activities = await response.json();
//     return activities;
// }

// async function beforeRender(req, res) {
//     try {
//         req.data.activities = await fetchActivities();
//     } catch (error) {
//         console.error('Error fetching activities:', error);
//     }
// }


// function afterRender(req, res) {
//   const transport = nodemailer.createTransport({
//     host: 'sandbox.smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//       user: '79e32bd0362e26',
//       pass: '5cb77dc70b96ea',
//     },
//   });

//   const mailOptions = {
//     from: 'sender@example.com',
//     to: 'recipient@example.com',
//     subject: 'Informe generado',
//     text: 'Adjunto encontrarás el informe en formato PDF.',
//     attachments: [
//       {
//         filename: 'informe.pdf',
//         content: res.content,
//         encoding: 'base64',
//         },
//     ],
//   };
//   transport.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error al enviar el correo electrónico:', error);
//     } else {
//       console.log('Correo electrónico enviado con éxito:', info.response);
//     }
//   });
// }

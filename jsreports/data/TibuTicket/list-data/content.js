const nodemailer = require('nodemailer');
const http = require('http');

async function fetchlists() {
    const options = {
        hostname: 'localhost',
        port: 4000,
        path: '/api/v1/lists',
        method: 'GET',
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (result) => {
            let str = '';
            result.on('data', (b) => str += b);
            result.on('error', reject);
            result.on('end', () => resolve(JSON.parse(str)));
        });

        req.end();
    });
}

async function fetchusers() {
    const options = {
        hostname: 'localhost',
        port: 4000,
        path: '/api/v1/users/users',
        method: 'GET',
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (result) => {
            let str = '';
            result.on('data', (b) => str += b);
            result.on('error', reject);
            result.on('end', () => resolve(JSON.parse(str)));
        });

        req.end();
    });
}

async function beforeRender(req, res) {
    try {
        req.data.lists = await fetchlists();
        console.log(req.data.lists);
    } catch (error) {
        console.error('Error fetching lists:', error);
    }

    try {
        req.data.users = await fetchusers();
        console.log(req.data.users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function afterRender(req, res) {
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '79e32bd0362e26',
      pass: '5cb77dc70b96ea',
    },
  });

  const mailOptions = {
    from: 'tibuticket@example.com',
    to: req.data.email,
    subject: 'Informe generado',
    text: 'Adjunto encontrarás el informe en formato PDF.',
    attachments: [
      {
        filename: 'informe.pdf',
        content: res.content,
        encoding: 'base64',
        },
    ],
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado con éxito:', info.response);
    }
  });
}

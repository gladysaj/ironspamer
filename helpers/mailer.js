const nodemailer = require('nodemailer');
// para acceder al contenido de un archivo ya viene instalado con node js
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});


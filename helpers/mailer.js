const nodemailer = require('nodemailer');
const hbs = require('hbs');
// para acceder al contenido de un archivo ya viene instalado con node.js, fs= file system
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});

// hacer uso de motor de vistas (handlebars)
const generateHTML = (filename, options) => {
  const html = hbs.compile(
    fs.readFileSync((__dirname,`./views/mail/${filename}.hbs`), "utf-8")
  );
  return html(options);
};

exports.send = options => {
  const html = generateHTML(options.filename, options)
  const mailOptions = {
    from: "👻 Gladys's mailer spamer 👻<glad.alvarez1@gmail.com>",
    to: options.email,
    subject: options.subject,
    message: options.message,
    html,
  };
  return transporter.sendMail(mailOptions);
}
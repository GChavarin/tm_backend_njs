// utilizar modulo de nodemailer
const nodemailer = require('nodemailer');

// crear un objecto 'transportador' que es capaz de enviar correo usando protocolo smtp
let transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: "60a6587c1b3c38",
        pass: "63ae73ec417940"
    }
});

// especificar emisor, receptor, titulo y contenido del correo 
message = {
         from: '"Emisor Ejemplo" deejemplo@email.com',
         to: "paraejemplo@email.com",
         subject: "Titulo",
         text: "Correo SMTP de prueba para el proyecto",
         html: "<p>Correo SMTP de prueba para el proyecto</p>"
    };

//
transporter.sendMail(message, function(err, info) {
        if (err) {
        console.log(err)
        } else {
        console.log(info);
        }});


// especificar emisor, receptor, titulo y contenido del correo 
message = {
         from: '"Emisor Ejemplo2" deejemplo@email.com',
         to: "paraejemplo2@email.com",
         subject: "Titulo",
         text: "Segundo Correo SMTP de prueba para el proyecto",
         html: "<p>Segundo Correo SMTP de prueba para el proyecto</p>"
    };

//
transporter.sendMail(message, function(err, info) {
        if (err) {
        console.log(err)
        } else {
        console.log(info);
        }});        
/*
3. Comando para utilizar HTTP:
var http = require('http');

4. Comando para una respuesta utilizando HTTP:
http.createServer(function (req, res) {
  res.write('Hello World!');
  res.end();
}).listen(8080);
*/

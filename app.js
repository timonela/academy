const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const nodemailer = require('nodemailer');

const app = express();

// API file for interacting with MongoDB
//const api = require('./server/routes/api');

//var index = require('./routes/index');
//var tasks = require('./routes/tasks');
var getapi = require('./server/routes/getapi');


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
//app.use('/api', api);

//app.use('/', index);
app.use('/', getapi);
//app.use('/tasks', tasks);
// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//==================================================================================\\
// Generate SMTP service account from ethereal.email
/* nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: 'malfor.saja@cit.edu.al',
            pass: 'my pass'
        }
    });

    // Message object
    let message = {
        from: 'malfor.saja@cit.edu.al',
        to: 'd.mane@ambrogio.al',
        subject: 'Nodemailer is working ✔',
        text: 'Nodemailer!',
        html: '<p><b>Hello</b> Desli!</p>'
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});  */
//====================================================================================//

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
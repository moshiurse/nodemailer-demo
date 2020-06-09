const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');


// initialize express
const app = express();

// initialize view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// setting up static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.render('contact', {layout: false});
});

//send mail post method
app.post('/send', (req, res) => {
    //output html
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'mail.moshiurse.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'mailtest@moshiurse.com',
          pass: '9V+;y$4yLUNx'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Moshiur Rahman" <mailtest@moshiurse.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Testing my mail server in nodejs', // Subject line
        text: 'Hello NodeJs Dev', // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent',layout: false});
    });
    });
  


app.listen(3000);
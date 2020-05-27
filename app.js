const express = require('express');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const nodemailer = require('nodemailer');

const app = express();

app.get('/', (req,res) => {
    res.send('Nodemailer');
})


app.listen(3000);
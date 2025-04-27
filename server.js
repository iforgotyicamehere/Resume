const express=require('express');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');

const app=express();
const port=3000;

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public')); 

//homepage route
app.get('/', (req, res) => {
 res.sendFile(__dirname + '/public/index.html');
});
//contact from route
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport ({
        service: 'gmail',
        auth: {
    user:'daquota92@gmail.com',
pass: 'Rentsdue1st!'
    }
});
const mailOptions = {
    from: email,
    to: 'daquota92@gamil.com',
    subject: 'I have an idea',
    text: message
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return res.status(500).send(error.toString());
    }
    res.status(200).send('Message Sent; ' + info.response);
 });
});

//Start Server
app.listen(port, () => { 
    console.log (`Server is running on http://localhost:${port}`);
});


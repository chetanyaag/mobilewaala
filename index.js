
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const serverless = require('serverless-http');
const mysql = require('mysql2');
const app = express();
const crypto = require('crypto');




const pool = mysql.createPool({
  host: '62.72.28.204',
  user: 'u778072769_mobilewaala',
  password: 'ImChetanya@1',
  database: 'u778072769_mobilewaala',
  connectionLimit: 20,
});


function genrateOtp(){
  const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
  return random4DigitNumber.toString();
}



app.use(helmet());
app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

app.get('/', async(req, res) => {
  try {
    const promisePool = pool.promise();

    // console.log(rows)
    var [rows,fields] = await promisePool.query("Select * from user_data ;");
    
    res.json(rows);

  } catch (error) {
    console.error('Error executing query:', error);


    res.status(500).send('Internal Server Error');
  }
});


app.post('/api/create', async (req, res) => {

  const requestData = req.body;
  const name = req.body.name;
  const mobile = req.body.mobile;
  console.log(name)
  console.log(mobile)
  try {
    const promisePool = pool.promise();
    const otp = genrateOtp()
    var query = `INSERT INTO user_data (name, mobile1, otp) VALUES ("${name}", ${mobile}, ${otp});`
    console.log(query)
    var [rows,fields] = await promisePool.query(query);
    // console.log(rows)
    [rows,fields] = await promisePool.query("Select * from user_data ;");
    
    res.json(rows);

  } catch (error) {
    console.error('Error executing query:', error);


    res.status(500).send('Internal Server Error');
  }

});

app.post('/api/validateOtp', async (req, res) =>{
    const requestData = req.body;
    const otp = req.body.otp;
    const mobile = req.body.mobile;
    try{
      const promisePool = pool.promise();
      var query = `Select * from  user_data where mobile1 = ${mobile};`
      var [rows,fields] = await promisePool.query(query);

      if (otp == rows[0]["otp"]){
        var query1 = `UPDATE user_data SET is_valid=1 where mobile1 = ${mobile};`
        console.log(query1)
        [rows,fields] = await promisePool.query(query1);
       
      }

      res.json(rows)

  } catch (error) {
    console.error('Error executing query:', error);


    res.status(500).send('Internal Server Error23');
  }



});

app.post('/api/mail', async (req, res) => {

  const requestData = req.body;
  console.log('Received POST data:');
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'agrawalbabli17@gmail.com',
      pass: 'hvpn cucn rhnk ooil',
    },
  });
  const mailOptions = {
    from: 'agrawalbabli17@gmail.com',
    to: 'gaurangagrawal626@gmail.com',
    subject: 'Hello, World!',
    text: req.body.mail,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Email sending failed' });
  }
});
// starting the server
app.listen(3000, () => {
  console.log('listening on port 3001');
});
// module.exports.handler = serverless(app);

// hvpn cucn rhnk ooil
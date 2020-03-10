const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Twilio credentials and config.
const accountSid = 'AC6690f02796407c0346bd5863bcc26519';
const authToken = '5e74bfe626f29fee8782dea660e13c65';
const client = require('twilio')(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

// Using post request to get audio file
app.post('/post', (req, res) => {
  console.log(req, 'req');
  res.send({ message: 'received' });
})

//Twilio voice call function
app.get('/call', (req, res) => {
  client.calls
    .create({
      record: true,
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: '+918489517576',
      from: '+441233801192'
    })
    .then(call => {
      console.log(call)
      client.calls(call.sid).recordings.create().then(rec =>
        console.log(rec, 'rec')
        //   client.recordings(`${rec.sid}`) 
        //     .fetch()
        //     .then(msg => console.log(msg, 'msg'))
        //     .catch(err => console.log('err', err))
      )
    })
    .catch(err => console.log(err));
  res.send({ message: 'Call connected...' });
})

app.listen(5000, () => {
  console.log('server running')
})
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

// Twilio credentials and config.
const accountSid = 'TWILIO_ACCOUNT_SID';
const authToken = 'TWILIO_AUTH_TOKEN';
const client = require('twilio')(accountSid, authToken);
const voiceResponse = require("twilio").twiml.VoiceResponse;

app.use(cors());
app.use(bodyParser.json());

var server = app.listen(8080, function(){
  console.log('app started');
});
const wss = new WebSocket.Server({server : server});

wss.on('connection', (message)=> {
  // console.log(message,'msg')
  const msg = JSON.parse(message);
  console.log(msg)
  switch(msg.event){
    case "connected":
    console.log('Call connected');
    break;
    case "start":
    console.log("Call started streaming");
    break;
    case "media":
    console.log("Streaming...");
    break;
    case "stop":
    console.log("Call stopped");
    break;
    default:
    break;
  }
});

// Using post request to get audio file
app.post('/post', (req, res) => {
  console.log(req, 'req');
  res.send({ message: 'received' });
})

// Twilio voice response
app.post('/', (req, res) => {
  console.log('.....')
  const twiml = new voiceResponse();
  twiml.start().stream({ url: "wss://dc3a0816.ngrok.io/", track: 'outbound_track' });
  twiml.say('Hello, this is zoi meet task');
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.send(twiml.toString());
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
      console.log(call);
    })
    .catch(err => console.log(err));
  res.send({ message: 'Call connected...' });
})


const accountSid = 'TWILIO_ACCOUNT_SID';
const authToken = 'TWILIO_AUTH_TOKEN';
const client = require('twilio')(accountSid, authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;

client.calls
.create({
  record: true,
  url: 'http://demo.twilio.com/docs/voice.xml',
  to: '+918489517576',
  from: '+441233801192'
})
.then(call => {
  console.log(call)
  const response = new VoiceResponse();
const start = response.start();
start.stream({
    name: 'Example Audio Stream',
    url: 'ws://localhost:5000/'
});

console.log(start,'streaming');
})
.catch(err => console.log(err));
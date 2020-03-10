## Zoi-Meet

### Browser based audio record

* Here we're using GatsbyJs (framework based on ReactJs and graphQl), it will help us to improve our SEO.
* React-mic is the package we used to record audio from browser.
* Once Rec button is clicked, it starts recording and send the datas to server every 5 secs. Also it updates size of the audio chunk every time.
* When we press stop button, the record process is stopped and sets the audio. Then we can click play button to listen.

### Twilio-voice stream

* For Twilio-voice call stream, Programmable-voice api in Twilio is used. 
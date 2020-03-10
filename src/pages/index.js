import React, { useState } from "react"
import Layout from "../components/layout"
import { ReactMic } from 'react-mic';

let audio;
let interval;
const audioChunks = [];
let audioBlob;


const styles = {
  button: {
    padding: '20px',
    borderRadius: '20px'
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  audio: {
    backgroundColor: 'gray',
    display: 'flex',
    flexDirection: 'column'
  },
  twilioBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: '20px'
  },
}

const IndexPage = () => {

  const [isRecording, setIsRecording] = useState(false);
  const [size, setSize] = useState(0);


  const onData = async (e) => {
    await audioChunks.push(e);
  }

  const onStop = async () => {
    const audioUrl = URL.createObjectURL(audioBlob);
    audio = new Audio(audioUrl);
  }


  const play = () => {
    if (audio) audio.play();
  }



  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  const record = () => {
    interval = setInterval(() => {
      send()
    }, 5000);
    setIsRecording(true);
  }

  const pause = () => {
    clearInterval(interval);
    setIsRecording(false);
  }

  const twilio = () => {
    fetch('http://localhost:5000/call', {
      method: 'GET',
    }).then(data => console.log(data)).catch(err => console.log(err))
  }

  const send = async () => {
    audioBlob = new Blob(audioChunks);
    let temp = audioBlob.size;
    setSize(bytesToSize(temp));
    const options = {
      method: 'POST',
      body: JSON.stringify(audioBlob),
      mode: 'no-cors',
      headers: { 'content-type': '*' }
    }
    const response = await fetch('http://localhost:5000/post', options);
  }


  return (
    <Layout>
      <div style={styles.audio}>
        <h4>Browser-audio</h4>
        <ReactMic
          record={isRecording}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <br />

        <div style={styles.buttonBox}>

          <button style={styles.button} onClick={record} >Rec</button>

          <button style={styles.button} onClick={pause}>Stop</button>

          <button style={styles.button} onClick={play}>play</button>

          <button style={styles.button} disabled>{size}</button>

        </div>
      </div>
      <br />

      <div style={styles.audio}>
        <h4>Twilio-voice</h4>
        <div style={styles.twilioBox}>
          <input placeholder='Enter number...'></input>
          <button onClick={twilio}>call</button>
        </div>
      </div>

    </Layout>
  )
}
export default IndexPage

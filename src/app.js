import fs from 'fs';
import path from 'path';
// import { remote as app } from 'electron';
const app = require('electron').remote;
const { dialog } = app;

const video = document.getElementById('video');
const recording = document.getElementById('recording');
const button = document.getElementById('button');
const downloadButton = document.getElementById("downloadButton");

let playing = false;
let stream = null;
let recordedBlob = null;


function wait(delayInMS) {
  return new Promise(resolve => setTimeout(resolve, delayInMS));
}


function blobToArrayBuffer(blob) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    reader.onloadend = function () {
      const result = reader.result || new ArrayBuffer(0)
      resolve(result)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(blob)
  });
}


function startRecording(s, lengthInMS) {
  let recorder = new MediaRecorder(s);
  let data = [];

  recorder.ondataavailable = event => data.push(event.data);
  recorder.start();
  console.log(recorder.state + " for " + (lengthInMS/1000) + " seconds...");

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = event => reject(event.name);
  });

  let recorded = wait(lengthInMS).then(
    () => recorder.state == "recording" && recorder.stop()
  );

  return Promise.all([ stopped, recorded ]).then(() => data);
}


button.addEventListener('click', () => {
  console.log('got on click');

  if (!playing) {
    navigator.mediaDevices.getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          maxWidth: 1280,
          maxHeight: 720,
          maxFrameRate: 10,
          minAspectRatio: 1.77,
        },
      },
      audio: false,
    })
      .then((s) => {
        stream = s;
        video.srcObject = stream;
        video.play();
        playing = true;

        return s;
        startRecording(stream, 2000);
      })
      .then((s) => startRecording(s, 2000))
      .then((recordedChunks) => {
        recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        recording.src = URL.createObjectURL(recordedBlob);
        downloadButton.href = recording.src;
        downloadButton.download = "RecordedVideo.webm";

        console.log("Successfully recorded " + recordedBlob.size + " bytes of " + recordedBlob.type + " media.");
        console.log('blob is ' + recordedBlob);
      })
      .catch((err) => {
        console.log('An error occurred! ' + err);
      });
  } else {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
    playing = false;

    // try {
    //   fs.writeFileSync(path.join(app.getPath('videos'), 'zz-done.txt'), 'video done', 'utf-8');
    // } catch(e) {
    //   console.error('Failed to save the file !', e);
    // }

    // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
    dialog.showSaveDialog((fileName) => {
      if (fileName === undefined){
        console.log("You didn't save the file");
        return;
      }

      // fileName is a string that contains the path and filename created in the save file dialog.
      blobToArrayBuffer(recordedBlob).then((data) => {
        console.log('what is it ', typeof data)
        fs.writeFile(fileName, Buffer.from(data), (err) => {
          if (err) {
            alert("An error ocurred creating the file "+ err.message)
          }

          alert("The file has been succesfully saved");
        });
      })
    });
  }
});

import fs from "fs";
import { remote as app } from "electron";
import blobToBuffer from "./blob-to-buffer";

const { dialog } = app;

export default class Recording {
  constructor(stream) {
    this.recorder = new MediaRecorder(stream);
    this.data = [];

    this.recorder.ondataavailable = event => this.data.push(event.data);
    this.recorder.onstop = event => {
      console.log(`Recording stopped: ${event.name}`);
    };
    this.recorder.onerror = event => {
      console.error(`Recording error: ${event.name}`);
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.blob = this.blob.bind(this);
    this.save = this.save.bind(this);
  }

  start() {
    this.recorder.start();
  }

  stop() {
    if (this.recorder.state === "recording") {
      this.recorder.stop();
    }
  }

  blob() {
    return new Blob(this.data, { type: "video/webm" });
  }

  save() {
    dialog.showSaveDialog(fileName => {
      if (fileName === undefined) {
        console.log("You didn't save the file");
        return;
      }

      blobToBuffer(this.blob()).then(data => {
        console.log("what is it ", typeof data);
        fs.writeFile(fileName, data, err => {
          if (err) {
            // eslint-disable-next-line no-alert
            alert("An error ocurred creating the file " + err.message);
          }

          // eslint-disable-next-line no-alert
          alert("The file has been succesfully saved");
        });
      });
    });
  }
}

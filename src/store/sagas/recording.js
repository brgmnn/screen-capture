import fs from "fs";
import os from "os";
import path from "path";
import { remote as app } from "electron";
import moment from "moment";
import { call, select, takeEvery } from "redux-saga/effects";
import * as Actions from "../actions/recording";
import blobToBuffer from "../../lib/blob-to-buffer";
import getSources from "../../lib/get-sources";
import getStream from "../../lib/get-stream";

const { dialog } = app;

let recorder = null;
let data = [];

const blob = () => {
  return new Blob(data, { type: "video/webm" });
};

export function* newRecorder() {
  const source = yield select(store => store.stream.source);
  console.log("whats the stream", source);
  const stream = yield call(getStream, source);

  recorder = new MediaRecorder(stream);
  data = [];

  recorder.ondataavailable = event => data.push(event.data);
  recorder.onstop = event => {
    console.log(`Recording stopped: ${event.name}`);
  };
  recorder.onerror = event => {
    console.error(`Recording error: ${event.name}`);
  };
}

export function* start() {
  yield call(newRecorder);
  recorder.start();
}

export function* stop() {
  if (recorder && recorder.state === "recording") {
    recorder.stop();
  }
}

export function* save() {
  const source = yield select(store => store.stream.source);
  const sourceList = yield call(getSources);
  const { name } = sourceList.find(s => s.id === source);

  const now = moment().format("YYYY MMMM Do, h-mma");
  const truncName = name
    .split(/\s/)
    .filter(w => w.match(/^\w+$/))
    .join(" ")
    .substr(0, 40);
  const defaultName = `Recording of ${truncName} - ${now}`;

  dialog.showSaveDialog(
    { defaultPath: path.join(os.homedir(), `${defaultName}.webm`) },
    fileName => {
      if (fileName === undefined) {
        console.log("You didn't save the file");
        return;
      }

      blobToBuffer(blob()).then(data => {
        console.log("what is it ", typeof data);
        fs.writeFile(fileName, data, err => {
          if (err) {
            // eslint-disable-next-line no-alert
            alert("An error ocurred creating the file " + err.message);
          }

          // eslint-disable-next-line no-alert
          alert("The file has been succesfully saved");
          recorder = null;
          data = [];
        });
      });
    }
  );
}

export default [
  takeEvery(Actions.RECORDING_START, start),
  takeEvery(Actions.RECORDING_STOP, stop),
  takeEvery(Actions.RECORDING_SAVE, save)
];

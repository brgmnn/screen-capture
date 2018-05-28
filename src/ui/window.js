import React, { Component, Fragment } from "react";
import getStream from "../lib/get-stream";
import Recording from "../lib/recording";
import PreviewVideo from "./preview-video";
import RecordButton from "./record-button";
import SaveButton from "./save-button";

class Window extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recording: false
    };

    this.onRecord = this.onRecord.bind(this);
    this.onSave = this.onSave.bind(this);
    this.recording = null;
  }

  onRecord(recording) {
    if (!this.recording) {
      this.recording = new Recording(window.stream);
    }

    if (recording) {
      this.recording.start();
      this.setState({ recording: true });
    } else if (!recording) {
      this.recording.stop();
      this.setState({ recording: false });
    }
  }

  onSave() {
    this.recording.save();
  }

  render() {
    const { recording } = this.state;

    return (
      <Fragment>
        <PreviewVideo recording={recording} />
        <RecordButton onClick={this.onRecord} />
        <SaveButton onClick={this.onSave} />
      </Fragment>
    );
  }
}

export default Window;

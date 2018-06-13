import React, { Component, Fragment } from "react";
import getStream from "../lib/get-stream";
import Recording from "../lib/recording";
import PreviewVideo from "./preview-video";
import RecordButton from "./record-button";
import Button from "./button";

class Window extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recording: false,
      record: null
    };

    this.onRecord = this.onRecord.bind(this);
    this.onSave = this.onSave.bind(this);
    this.recording = null;
  }

  onNew(callback) {
    this.setState({ record: new Recording(window.stream) }, callback);
  }

  onRecord(recording) {
    let { record } = this.state;

    const toggle = () => {
      if (recording) {
        this.state.record.start();
        this.setState({ recording: true });
      } else if (!recording) {
        this.state.record.stop();
        this.setState({ recording: false });
      }
    };

    if (!record) {
      this.onNew(toggle);
    } else {
      toggle();
    }
  }

  onSave() {
    this.state.record.save();
  }

  render() {
    const { record, recording } = this.state;

    return (
      <Fragment>
        <PreviewVideo recording={recording} />
        <RecordButton onClick={this.onRecord} />
        <Button
          className="bottom size-big"
          onClick={this.onSave}
          disabled={!record || recording}
        >
          Save
        </Button>
      </Fragment>
    );
  }
}

export default Window;

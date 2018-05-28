import React, { Component } from "react";
import getStream from "../lib/get-stream";

class PreviewVideo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getStream().then(stream => {
      this.video.srcObject = stream;
      this.video.play();
      window.stream = stream;
    });
  }

  render() {
    const classes = this.props.recording ? "recording" : "";

    return (
      <video
        id="preview-video"
        className={classes}
        ref={node => (this.video = node)}
      >
        PreviewVideo
      </video>
    );
  }
}

export default PreviewVideo;

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import getStream from "../lib/get-stream";

class PreviewVideo extends PureComponent {
  constructor(props) {
    super(props);

    this.playSource = this.playSource.bind(this);
  }

  playSource(source) {
    getStream(source).then(stream => {
      this.video.srcObject = stream;
      this.video.play();
      window.stream = stream;
    });
  }

  componentDidMount() {
    this.playSource();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.source !== this.props.source) {
      this.playSource(this.props.source);
    }
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

export const mapStateToProps = state => ({ source: state.stream.source });

export default connect(mapStateToProps)(PreviewVideo);

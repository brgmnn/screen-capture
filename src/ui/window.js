import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import getStream from "../lib/get-stream";
import Recording from "../lib/recording";
import * as RecordingActions from "../store/actions/recording";
import PreviewVideo from "./preview-video";
import RecordButton from "./record-button";
import Button from "./button";
import SourcesList from "./sources-list";

const Window = ({
  isRecording,
  startRecording,
  saveRecording,
  stopRecording
}) => {
  const onRecord = isRecording ? stopRecording : startRecording;

  return (
    <Fragment>
      <PreviewVideo recording={isRecording} />
      <SourcesList />

      <Button className="primary size-big top" onClick={onRecord}>
        {isRecording ? "Stop Recording" : "Record"}
      </Button>
      <Button
        className="bottom size-big"
        onClick={saveRecording}
        disabled={isRecording}
      >
        Save
      </Button>
    </Fragment>
  );
};

export const mapStateToProps = state => ({
  isRecording: state.recording.active,
  source: state.stream.source
});
export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startRecording: RecordingActions.start,
      stopRecording: RecordingActions.stop,
      saveRecording: RecordingActions.save
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Window);

import React, { Component } from "react";

class RecordButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recording: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState(state => {
      const recording = !state.recording;
      this.props.onClick(recording);
      return { recording };
    });
  }

  render() {
    const { recording } = this.state;

    return (
      <button onClick={this.onClick}>
        {recording ? "Stop Recording" : "Record"}
      </button>
    );
  }
}

export default RecordButton;

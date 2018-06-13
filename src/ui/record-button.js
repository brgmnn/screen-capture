import React, { Component } from "react";

import Button from "./button";

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
      <Button className="primary size-big top" onClick={this.onClick}>
        {recording ? "Stop Recording" : "Record"}
      </Button>
    );
  }
}

export default RecordButton;

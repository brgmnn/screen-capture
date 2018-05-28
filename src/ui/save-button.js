import React, { Component } from "react";

class SaveButton extends Component {
  render() {
    return <button onClick={this.props.onClick}>Save</button>;
  }
}

export default SaveButton;

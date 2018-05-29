import React, { Component } from "react";

class SaveButton extends Component {
  render() {
    const { children, disabled, onClick } = this.props;

    return (
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }
}

export default SaveButton;

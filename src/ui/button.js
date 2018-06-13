import React, { Component } from "react";
import classNames from "classnames";

class SaveButton extends Component {
  render() {
    const { children, className, disabled, onClick } = this.props;

    const classes = classNames("button", className, { disabled });

    return (
      <span className={classes} onClick={onClick} disabled={disabled}>
        {children}
      </span>
    );
  }
}

export default SaveButton;

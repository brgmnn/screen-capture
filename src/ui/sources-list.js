import React, { Component } from "react";
import { desktopCapturer } from "electron";

class SourcesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sources: []
    };

    // this.onClick = this.onClick.bind(this);
    this.getSources = this.getSources.bind(this);
    this.drawOptions = this.drawOptions.bind(this);

    this.getSources();
  }

  // onClick() {
  //   this.setState(state => {
  //     const recording = !state.recording;
  //     this.props.onClick(recording);
  //     return { recording };
  //   });
  // }

  getSources() {
    desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
      console.log("sources", sources);
      this.setState({
        sources: sources.map(s => ({ id: s.id, name: s.name }))
      });
    });
  }

  drawOptions() {
    return this.state.sources.map(s => (
      <option key={s.id} value={s.id}>
        {s.name.substr(0, 40)}
      </option>
    ));
  }

  render() {
    const { recording } = this.state;

    return (

      <select onChange={(event) => { window.streamSource = event.target.value) }}>
        {this.drawOptions()}
      </select>
    );
  }
}

export default SourcesList;

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSource } from "../store/actions/stream";

class SourcesList extends Component {
  constructor(props) {
    super(props);

    this.drawOptions = this.drawOptions.bind(this);
  }

  drawOptions() {
    return this.props.sources.map(src => (
      <option key={src.id} value={src.id}>
        {src.name.substr(0, 40)}
      </option>
    ));
  }

  render() {
    const { setSource } = this.props;

    return (
      <select onChange={e => setSource(e.target.value)}>
        {this.drawOptions()}
      </select>
    );
  }
}

export const mapStateToProps = state => ({
  sources: state.stream.sourceList
});
export const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSource }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SourcesList);

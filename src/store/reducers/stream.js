import * as Actions from "../actions/stream";

export const defaultState = {
  source: null,
  sourceList: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.STREAM_SET_SOURCE:
      return Object.assign({}, state, { source: action.source });

    case Actions.STREAM_SET_SOURCE_LIST:
      return Object.assign({}, state, { sourceList: action.sourceList });

    default:
      return state;
  }
}

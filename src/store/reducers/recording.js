import * as Actions from "../actions/recording";

export const defaultState = {
  active: false
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.RECORDING_START:
      return Object.assign({}, state, { active: true });

    case Actions.RECORDING_STOP:
      return Object.assign({}, state, { active: false });

    default:
      return state;
  }
}

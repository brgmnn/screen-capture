export const RECORDING_START = "RECORDING_START";
export const RECORDING_STOP = "RECORDING_STOP";
export const RECORDING_SAVE = "RECORDING_SAVE";

export const start = () => ({ type: RECORDING_START });
export const stop = () => ({ type: RECORDING_STOP });
export const save = () => ({ type: RECORDING_SAVE });

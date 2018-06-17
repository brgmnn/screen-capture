export const STREAM_SET_SOURCE = "STREAM_SET_SOURCE";
export const STREAM_SET_SOURCE_LIST = "STREAM_SET_SOURCE_LIST";

export const setSource = source => ({ type: STREAM_SET_SOURCE, source });
export const setSourceList = sourceList => ({
  type: STREAM_SET_SOURCE_LIST,
  sourceList
});

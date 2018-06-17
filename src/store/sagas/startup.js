import { call, put, select, takeEvery } from "redux-saga/effects";
import getSources from "../../lib/get-sources";
import { setSourceList } from "../actions/stream";

export function* getSourceList() {
  const list = yield call(getSources);
  yield put(setSourceList(list));
}

export default [call(getSourceList)];

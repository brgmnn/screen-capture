import { all } from "redux-saga/effects";
import recording from "./recording";
import startup from "./startup";

export default function*() {
  return yield all([...startup, ...recording]);
}

import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createActionTypes from "../lib/createActionTypes";
import createRequestSaga from "../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createActionTypes("user/CHECK");

export const check = createAction(CHECK);

const checkSaga = createRequestSaga(CHECK, authAPI.check);
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
}

const initialState = {
  user: null,
  error: null,
};

const user = handleActions(
  {
    [CHECK_SUCCESS]: (state, { payload: user }) => ({ user, error: null }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({ user: null, error }),
  },
  initialState
);

export default user;

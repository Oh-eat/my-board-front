import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createActionTypes from "../lib/createActionTypes";
import createRequestSaga from "../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";

const TEMP_SET_USER = "user/TEMP_SET_USER";
const CHECK = createActionTypes("user/CHECK");
const CLEAR_ERROR = "user/CLEAR_ERROR";
const LOGOUT = "user/LOGOUT";

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK.REQUEST);
export const clearError = createAction(CLEAR_ERROR);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);
const checkFailureSaga = () => {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log("localstorage error");
  }
};
const logoutSaga = () => {
  authAPI.logout();
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log("localstorage error");
  }
};
export function* userSaga() {
  yield takeLatest(CHECK.REQUEST, checkSaga);
  yield takeLatest(CHECK.FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  error: null,
};

const user = handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({ ...state, user }),
    [CHECK.SUCCESS]: (state, { payload: user }) => ({ user, error: null }),
    [CHECK.FAILURE]: (state, { payload: error }) => ({ user: null, error }),
    [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
    [LOGOUT]: (state) => initialState,
  },
  initialState
);

export default user;

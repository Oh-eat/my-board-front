import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createActionTypes from "../lib/createActionTypes";
import createRequestSaga from "../lib/createRequestSaga";
import * as checkAPI from "../lib/api/check";

const CLEAR_ERROR = "postAction/CLEAR_ERROR";
const CLEAR_CHECK = "postAction/CLEAR_CHECK";
const UNLOAD_POST = "postAction/UNLOAD_POST";
const CHANGE_POST = "postAction/CHANGE_POST";
const CHANGE_FORM = "postAction/CHANGE_FORM";
const [
  CHECK_WRITE,
  CHECK_WRITE_SUCCESS,
  CHECK_WRITE_FAILURE,
] = createActionTypes("postAction/CHECK_WRITE");

export const clearError = createAction(CLEAR_ERROR);
export const clearCheck = createAction(CLEAR_CHECK);
export const unloadPost = createAction(UNLOAD_POST);
export const changePost = createAction(
  CHANGE_POST,
  ({ action, name, value }) => ({ action, name, value })
);
export const changeForm = createAction(CHANGE_FORM, ({ name, value }) => ({
  name,
  value,
}));
export const checkWrite = createAction(
  CHECK_WRITE,
  ({ username, password }) => ({ username, password })
);

const checkWriteSaga = createRequestSaga(CHECK_WRITE, checkAPI.checkPostWrite);
export function* postActionSaga() {
  yield takeLatest(CHECK_WRITE, checkWriteSaga);
}

const initialState = {
  write: {
    title: "",
    body: "",
    tags: [],
  },
  edit: {
    title: "",
    body: "",
    tags: [],
  },
  postId: null,
  username: "",
  password: "",
  permission: false,
  error: null,
};

const postAction = handleActions(
  {
    [CLEAR_ERROR]: (state) => ({
      ...state,
      error: null,
    }),
    [CLEAR_CHECK]: (state) => ({
      ...state,
      permission: false,
      error: null,
    }),
    [UNLOAD_POST]: (state) => ({
      ...state,
      write: initialState.write,
      edit: initialState.edit,
      postId: null,
    }),
    [CHANGE_POST]: (state, { payload: { action, name, value } }) => ({
      ...state,
      [action]: { ...state[action], [name]: value },
    }),
    [CHANGE_FORM]: (state, { payload: { name, value } }) => ({
      ...state,
      [name]: value,
    }),
    [CHECK_WRITE]: (state) => ({
      ...state,
      permission: false,
      error: null,
    }),
    [CHECK_WRITE_SUCCESS]: (state, { status }) => ({
      ...state,
      permission: status === 200 ? true : false,
      error: status === 200 ? null : status,
    }),
    [CHECK_WRITE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      permission: false,
      error,
    }),
  },
  initialState
);

export default postAction;

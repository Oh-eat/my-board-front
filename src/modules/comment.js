import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createActionTypes from "../lib/createActionTypes";
import createRequestSaga from "../lib/createRequestSaga";
import * as commentAPI from "../lib/api/comment";

const INITIALIZE_COMMENT = "comment/INITIALIZE_COMMENT";
const CHANGE_FIELD = "comment/CHANGE_FIELD";
const [
  WRITE_COMMENT,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
] = createActionTypes("comment/WRITE_COMMENT");

export const initializeComment = createAction(INITIALIZE_COMMENT);
export const changeField = createAction(CHANGE_FIELD, ({ name, value }) => ({
  name,
  value,
}));
export const writeComment = createAction(
  WRITE_COMMENT,
  ({ rootPostId, rootCommentId, body, username, password }) => ({
    rootPostId,
    rootCommentId,
    body,
    username,
    password,
  })
);

const writeCommentSaga = createRequestSaga(WRITE_COMMENT, commentAPI.write);
export function* commentSaga() {
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
}

const initialState = {
  body: "",
  username: "",
  password: "",
  comment: null,
  error: null,
};

const comment = handleActions(
  {
    [INITIALIZE_COMMENT]: (state) => ({
      state,
      body: "",
      comment: null,
      error: null,
    }),
    [CHANGE_FIELD]: (state, { payload: { name, value } }) => ({
      ...state,
      [name]: value,
    }),
    [WRITE_COMMENT]: (state) => ({
      ...state,
      comment: null,
      error: null,
    }),
    [WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      body: "",
      comment,
      error: null,
    }),
    [WRITE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      comment: null,
      error,
    }),
  },
  initialState
);

export default comment;

import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createActionTypes from "../lib/createActionTypes";
import createRequestSaga from "../lib/createRequestSaga";
import * as commentAPI from "../lib/api/comment";
import * as checkAPI from "../lib/api/check";

const INITIALIZE_COMMENT = "comment/INITIALIZE_COMMENT";
const INITIALIZE_DELETE = "comment/INITIALIZE_DELETE";
const CHANGE_FIELD = "comment/CHANGE_FIELD";
const SET_TARGET = "comment/SET_TARGET";
const WRITE_COMMENT = createActionTypes("comment/WRITE_COMMENT");
const CHECK_DELETE = createActionTypes("comment/CHECK_DELETE");
const DELETE_COMMENT = createActionTypes("comment/DELETE_COMMENT");

export const initializeComment = createAction(INITIALIZE_COMMENT);
export const initializeDelete = createAction(INITIALIZE_DELETE);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ action, name, value }) => ({ action, name, value })
);
export const setTarget = createAction(SET_TARGET, (target) => target);
export const checkDelete = createAction(
  CHECK_DELETE.REQUEST,
  ({ id, password }) => ({
    id,
    password,
  })
);
export const writeComment = createAction(
  WRITE_COMMENT.REQUEST,
  ({ rootPostId, rootCommentId, body, username, password }) => ({
    rootPostId,
    rootCommentId,
    body,
    username,
    password,
  })
);
export const deleteComment = createAction(
  DELETE_COMMENT.REQUEST,
  ({ id, password }) => ({ id, password })
);

const checkDeleteSaga = createRequestSaga(
  CHECK_DELETE,
  checkAPI.checkCommentDelete
);
const writeCommentSaga = createRequestSaga(WRITE_COMMENT, commentAPI.write);
const deleteCommentSaga = createRequestSaga(DELETE_COMMENT, commentAPI.remove);
export function* commentSaga() {
  yield takeLatest(CHECK_DELETE.REQUEST, checkDeleteSaga);
  yield takeLatest(WRITE_COMMENT.REQUEST, writeCommentSaga);
  yield takeLatest(DELETE_COMMENT.REQUEST, deleteCommentSaga);
}

const initialState = {
  write: {
    body: "",
    username: "",
    password: "",
    comment: null,
    error: null,
  },
  delete: {
    target: null,
    password: "",
    permission: false,
    deleted: false,
    error: null,
  },
};

const comment = handleActions(
  {
    [INITIALIZE_COMMENT]: (state) => ({
      write: {
        ...initialState.write,
        username: state.write.username,
        password: state.write.password,
      },
      delete: {
        ...initialState.delete,
      },
    }),
    [INITIALIZE_DELETE]: (state) => ({
      ...state,
      delete: {
        ...initialState.delete,
      },
    }),
    [CHANGE_FIELD]: (state, { payload: { action, name, value } }) => ({
      ...state,
      [action]: {
        ...state[action],
        [name]: value,
      },
    }),
    [SET_TARGET]: (state, { payload: target }) => ({
      ...state,
      delete: {
        ...state.delete,
        target,
      },
    }),
    [CHECK_DELETE.REQUEST]: (state) => ({
      ...state,
      delete: {
        ...state.delete,
        permission: false,
        deleted: false,
      },
    }),
    [CHECK_DELETE.SUCCESS]: (state) => ({
      ...state,
      delete: {
        ...state.delete,
        permission: true,
        error: null,
      },
    }),
    [CHECK_DELETE.FAILURE]: (state, { payload: error }) => ({
      ...state,
      delete: {
        ...state.delete,
        permission: false,
        error,
      },
    }),
    [WRITE_COMMENT.REQUEST]: (state) => ({
      ...state,
      write: {
        ...state.write,
        comment: null,
        error: null,
      },
    }),
    [WRITE_COMMENT.SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      write: {
        ...state.write,
        body: "",
        comment,
        error: null,
      },
    }),
    [WRITE_COMMENT.FAILURE]: (state, { payload: error }) => ({
      ...state,
      write: {
        ...state.write,
        comment: null,
        error,
      },
    }),
    [DELETE_COMMENT.REQUEST]: (state) => ({
      ...state,
      delete: {
        ...state.delete,
        deleted: false,
      },
    }),
    [DELETE_COMMENT.SUCCESS]: (state) => ({
      ...state,
      delete: {
        ...state.delete,
        deleted: true,
      },
    }),
    [DELETE_COMMENT.FAILURE]: (state, { payload: error }) => ({
      ...state,
      delete: {
        ...state.delete,
        deleted: false,
        error,
      },
    }),
  },
  initialState
);

export default comment;

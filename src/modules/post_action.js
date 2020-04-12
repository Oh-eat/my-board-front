import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createActionTypes from "../lib/createActionTypes";
import createRequestSaga from "../lib/createRequestSaga";
import * as checkAPI from "../lib/api/check";
import * as postAPI from "../lib/api/post";

const CLEAR_ERROR = "postAction/CLEAR_ERROR";
const CLEAR_CHECK = "postAction/CLEAR_CHECK";
const SET_POST = "postAction/SET_POST";
const UNLOAD_POST = "postAction/UNLOAD_POST";
const CHANGE_POST = "postAction/CHANGE_POST";
const CHANGE_FORM = "postAction/CHANGE_FORM";
const CHECK_WRITE = createActionTypes("postAction/CHECK_WRITE");
const CHECK_UPDATE = createActionTypes("postAction/CHECK_UPDATE");
const CHECK_DELETE = createActionTypes("postAction/CHECK_DELETE");
const WRITE_POST = createActionTypes("postAction/WRITE_POST");
const UPDATE_POST = createActionTypes("postAction/UPDATE_POST");
const DELETE_POST = createActionTypes("postAction/DELETE_POST");

export const clearError = createAction(CLEAR_ERROR);
export const clearCheck = createAction(CLEAR_CHECK);
export const setPost = createAction(
  SET_POST,
  ({ postId, title, body, tags }) => ({ postId, title, body, tags })
);
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
  CHECK_WRITE.REQUEST,
  ({ username, password }) => ({ username, password })
);
export const checkUpdate = createAction(
  CHECK_UPDATE.REQUEST,
  ({ id, password }) => ({
    id,
    password,
  })
);
export const checkDelete = createAction(
  CHECK_DELETE.REQUEST,
  ({ id, password }) => ({
    id,
    password,
  })
);
export const writePost = createAction(
  WRITE_POST.REQUEST,
  ({ title, body, tags, username, password }) => ({
    title,
    body,
    tags,
    username,
    password,
  })
);
export const updatePost = createAction(
  UPDATE_POST.REQUEST,
  ({ id, title, body, tags, password }) => ({
    id,
    title,
    body,
    tags,
    password,
  })
);
export const deletePost = createAction(
  DELETE_POST.REQUEST,
  ({ id, password }) => ({
    id,
    password,
  })
);

const checkWriteSaga = createRequestSaga(CHECK_WRITE, checkAPI.checkPostWrite);
const checkUpdateSaga = createRequestSaga(
  CHECK_UPDATE,
  checkAPI.checkPostUpdate
);
const checkDeleteSaga = createRequestSaga(
  CHECK_DELETE,
  checkAPI.checkPostDelete
);
const writePostSaga = createRequestSaga(WRITE_POST, postAPI.write);
const updatePostSaga = createRequestSaga(UPDATE_POST, postAPI.update);
const deletePostSaga = createRequestSaga(DELETE_POST, postAPI.remove);
export function* postActionSaga() {
  yield takeLatest(CHECK_WRITE.REQUEST, checkWriteSaga);
  yield takeLatest(CHECK_UPDATE.REQUEST, checkUpdateSaga);
  yield takeLatest(CHECK_DELETE.REQUEST, checkDeleteSaga);
  yield takeLatest(WRITE_POST.REQUEST, writePostSaga);
  yield takeLatest(UPDATE_POST.REQUEST, updatePostSaga);
  yield takeLatest(DELETE_POST.REQUEST, deletePostSaga);
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
  username: null,
  password: null,
  permission: false,
  post: null,
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
    [SET_POST]: (state, { payload: { postId, title, body, tags } }) => ({
      ...state,
      postId,
      edit: { title, body, tags },
    }),
    [UNLOAD_POST]: (state) => ({
      ...state,
      write: initialState.write,
      edit: initialState.edit,
      post: null,
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
    [CHECK_WRITE.REQUEST]: (state) => ({
      ...state,
      permission: false,
    }),
    [CHECK_WRITE.SUCCESS]: (state, { status }) => ({
      ...state,
      permission: true,
      error: null,
    }),
    [CHECK_WRITE.FAILURE]: (state, { payload: error }) => ({
      ...state,
      permission: false,
      error,
    }),
    [CHECK_UPDATE.REQUEST]: (state) => ({
      ...state,
      permission: false,
    }),
    [CHECK_UPDATE.SUCCESS]: (state, { status }) => ({
      ...state,
      permission: true,
      error: null,
    }),
    [CHECK_UPDATE.FAILURE]: (state, { payload: error }) => ({
      ...state,
      permission: false,
      error,
    }),
    [CHECK_DELETE.REQUEST]: (state) => ({
      ...state,
      permission: false,
    }),
    [CHECK_DELETE.SUCCESS]: (state, { status }) => ({
      ...state,
      permission: true,
      error: null,
    }),
    [CHECK_DELETE.FAILURE]: (state, { payload: error }) => ({
      ...state,
      permission: false,
      error,
    }),
    [WRITE_POST.SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      error: null,
    }),
    [WRITE_POST.FAILURE]: (state, { payload: error }) => ({
      ...state,
      post: null,
      error,
    }),
    [UPDATE_POST.SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      error: null,
    }),
    [UPDATE_POST.FAILURE]: (state, { payload: error }) => ({
      ...state,
      post: null,
      error,
    }),
    [DELETE_POST.SUCCESS]: (state, { status }) => ({
      ...state,
      permission: status,
      error: null,
    }),
    [DELETE_POST.FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default postAction;

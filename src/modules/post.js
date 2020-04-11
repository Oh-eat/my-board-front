import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createActionTypes from "../lib/createActionTypes";
import createRequestSaga from "../lib/createRequestSaga";
import * as postAPI from "../lib/api/post";

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = createActionTypes(
  "post/READ_POST"
);
const ADD_COMMENT = "post/ADD_COMMENT";
const DELETE_COMMENT = "post/DELETE_COMMENT";

export const readPost = createAction(READ_POST, (id) => id);
export const addComment = createAction(ADD_COMMENT, (comment) => comment);
export const deleteComment = createAction(DELETE_COMMENT, (id) => id);

const readPostSaga = createRequestSaga(READ_POST, postAPI.read);
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
  post: null,
  comments: [],
  error: null,
};

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: { comments, ...post } }) => ({
      ...state,
      post,
      comments,
      error: null,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      post: null,
      comments: [],
      error,
    }),
    [ADD_COMMENT]: (state, { payload: comment }) => ({
      ...state,
      comments: state.comments.concat(comment),
    }),
    [DELETE_COMMENT]: (state, { payload: id }) => ({
      ...state,
      comments: state.comments.filter((comment) => comment._id !== id),
    }),
  },
  initialState
);

export default post;

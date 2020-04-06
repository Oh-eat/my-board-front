import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createActionTypes from "../lib/createActionTypes";
import createRequestSaga from "../lib/createRequestSaga";
import * as postAPI from "../lib/api/post";

const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] = createActionTypes(
  "posts/LIST_POSTS"
);

export const listPosts = createAction(LIST_POSTS);

const listPostsSaga = createRequestSaga(LIST_POSTS, postAPI.list);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState = {
  posts: null,
  error: null,
};

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts }) => ({
      posts,
      error: null,
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      posts: null,
      error,
    }),
  },
  initialState
);

export default posts;

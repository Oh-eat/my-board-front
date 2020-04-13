import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createActionTypes from "../lib/createActionTypes";
import createRequestSaga from "../lib/createRequestSaga";
import * as postAPI from "../lib/api/post";

const UNLOAD_POSTS = "posts/UNLOAD_POSTS";
const LIST_POSTS = createActionTypes("posts/LIST_POSTS");

export const unloadPosts = createAction(UNLOAD_POSTS);
export const listPosts = createAction(LIST_POSTS.REQUEST, (query) => query);

const listPostsSaga = createRequestSaga(LIST_POSTS, postAPI.list);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS.REQUEST, listPostsSaga);
}

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
};

const posts = handleActions(
  {
    [UNLOAD_POSTS]: (state) => initialState,
    [LIST_POSTS.SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts,
      error: null,
      lastPage: parseInt(response.headers["last-page"]),
    }),
    [LIST_POSTS.FAILURE]: (state, { payload: error }) => ({
      ...state,
      posts: null,
      error,
    }),
  },
  initialState
);

export default posts;

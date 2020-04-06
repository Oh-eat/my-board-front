import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createActionTypes from "../lib/createActionTypes";
import createRequestSaga from "../lib/createRequestSaga";
import * as postAPI from "../lib/api/post";

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = createActionTypes(
  "post/READ_POST"
);

export const readPost = createAction(READ_POST, (id) => id);

const readPostSaga = createRequestSaga(READ_POST, postAPI.read);
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({ post, error: null }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({ post: null, error }),
  },
  initialState
);

export default post;

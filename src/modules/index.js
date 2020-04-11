import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import post, { postSaga } from "./post";
import posts, { postsSaga } from "./posts";
import postAction, { postActionSaga } from "./post_action";
import comment, { commentSaga } from "./comment";
import loading from "./loading";
import modal from "./modal";

const rootReducer = combineReducers({
  auth,
  user,
  post,
  posts,
  postAction,
  comment,
  loading,
  modal,
});

export const rootSaga = function* () {
  yield all([
    authSaga(),
    userSaga(),
    postSaga(),
    postsSaga(),
    postActionSaga(),
    commentSaga(),
  ]);
};

export default rootReducer;

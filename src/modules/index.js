import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import post, { postSaga } from "./post";
import posts, { postsSaga } from "./posts";
import loading from "./loading";

const rootReducer = combineReducers({ auth, user, post, posts, loading });

export const rootSaga = function* () {
  yield all([authSaga(), userSaga(), postSaga(), postsSaga()]);
};

export default rootReducer;

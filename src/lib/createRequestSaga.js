import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loading";

export default function createRequestSaga(actionType, api) {
  return function* (action) {
    const { SUCCESS, FAILURE } = actionType;
    yield put(startLoading(actionType));
    try {
      const response = yield call(api, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
        status: response.status,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    } finally {
      yield put(finishLoading(actionType));
    }
  };
}

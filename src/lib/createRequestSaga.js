import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loading";

export default function createRequestSaga(actionType, api) {
  const SUCCESS = `${actionType}_SUCCESS`;
  const FAILURE = `${actionType}_FAILURE`;
  return function* (action) {
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

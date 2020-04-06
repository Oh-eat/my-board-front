import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createActionTypes from "../lib/createActionTypes";
import createRequestSaga from "../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";

const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const CHANGE_FIELD = "auth/CHANGE_FIELD";
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createActionTypes("auth/LOGIN");
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createActionTypes(
  "auth/REGISTER"
);

export const initializeForm = createAction(INITIALIZE_FORM);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, name, value }) => ({
    form,
    name,
    value,
  })
);
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));
export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password,
}));

const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
}

const initialState = {
  login: {
    username: "",
    password: "",
    error: null,
  },
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
    error: null,
  },
  auth: null,
};

const auth = handleActions(
  {
    [INITIALIZE_FORM]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { form, name, value } }) => ({
      ...state,
      [form]: {
        ...state[form],
        [name]: value,
      },
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      login: { ...state.login, error: null },
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      auth: null,
      login: { ...state.login, error },
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      register: { ...state.register, error: null },
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      auth: null,
      register: { ...state.register, error },
    }),
  },
  initialState
);

export default auth;

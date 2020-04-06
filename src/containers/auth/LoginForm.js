import React, { useEffect, useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, login } from "../../modules/auth";
import { withRouter } from "react-router-dom";
import { check } from "../../modules/user";

function LoginForm({ history }) {
  const dispatch = useDispatch();
  const { username, password, auth, authError, user, userError } = useSelector(
    ({ auth, user }) => ({
      username: auth.username,
      password: auth.password,
      auth: auth.auth,
      authError: auth.error,
      user: user.user,
      userError: user.error,
    })
  );
  const [inputError, setInputError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };
  const onChangeField = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ name, value }));
  };

  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 400) {
        setInputError("아이디와 비밀번호를 올바른 형식으로 입력해 주세요.");
        return;
      }

      if (authError.response.status === 401) {
        setInputError("올바르지 않은 비밀번호입니다.");
        return;
      }

      if (authError.response.status === 404) {
        setInputError("존재하지 않는 사용자입니다.");
        return;
      }

      setInputError("로그인 실패.\n나중에 다시 시도해 주세요.");
      return;
    }

    if (auth) {
      console.log(auth);
      dispatch(check());
      return;
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (userError) {
      setInputError("로그인 실패.\n나중에 다시 시도해 주세요.");
      return;
    }

    if (user) {
      history.push("/");
      return;
    }
  }, [user, userError, history]);

  return (
    <AuthForm
      type="login"
      username={username}
      password={password}
      inputError={inputError}
      onChangeField={onChangeField}
      onSubmit={onSubmit}
    />
  );
}

export default withRouter(LoginForm);

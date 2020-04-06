import React, { useEffect, useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";
import { check } from "../../modules/user";
import { withRouter } from "react-router-dom";

function RegisterForm({ history }) {
  const dispatch = useDispatch();
  const {
    username,
    password,
    passwordConfirm,
    auth,
    authError,
    user,
    userError,
  } = useSelector(({ auth, user }) => ({
    username: auth.username,
    password: auth.password,
    passwordConfirm: auth.passwordConfirm,
    auth: auth.auth,
    authError: auth.error,
    user: user.user,
    userError: user.error,
  }));
  const [inputError, setInputError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setInputError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    dispatch(register({ username, password }));
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
        setInputError(
          "아이디, 비밀번호, 비밀번호 확인을 올바른 형식으로 입력해 주세요."
        );
        return;
      }

      if (authError.response.status === 409) {
        setInputError("이미 사용 중인 아이디입니다.");
        return;
      }

      setInputError("회원가입 실패.\n나중에 다시 시도해 주세요.");
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
      setInputError("회원가입 실패.\n나중에 다시 시도해 주세요.");
      return;
    }

    if (user) {
      history.push("/");
      return;
    }
  }, [user, userError, history]);

  return (
    <AuthForm
      type="register"
      username={username}
      password={password}
      passwordConfirm={passwordConfirm}
      inputError={inputError}
      onChangeField={onChangeField}
      onSubmit={onSubmit}
    />
  );
}

export default withRouter(RegisterForm);

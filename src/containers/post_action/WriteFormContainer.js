import React, { useEffect, useState } from "react";
import WriteForm from "../../components/post_action/WriteForm";
import { useSelector, useDispatch } from "react-redux";
import {
  changeForm,
  checkWrite,
  clearCheck,
  clearError,
} from "../../modules/post_action";

function WriteFormContainer(props) {
  const [inputError, setInputError] = useState(null);
  const dispatch = useDispatch();
  const { username, password, error } = useSelector(({ postAction }) => ({
    username: postAction.username,
    password: postAction.password,
    error: postAction.error,
    // permission: postAction.permission,
    // loading: loading["postAction/CHECK_WRITE"],
  }));

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    dispatch(changeForm({ name, value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !username ||
      !password ||
      [username.trim(), password.trim()].includes("")
    ) {
      setInputError("모든 항목을 빠짐없이 입력해 주세요.");
      return;
    }

    dispatch(checkWrite({ username, password }));
  };

  useEffect(() => {
    if (error) {
      if (error.response.status === 400) {
        setInputError("조건에 맞게 입력해 주세요.");
        return;
      }

      setInputError(
        "서버 상태가 원활하지 않습니다. 나중에 다시 시도해 주세요."
      );
      return;
    }
  }, [error]);

  return (
    <WriteForm
      username={username || ""}
      password={password || ""}
      inputError={inputError}
      onChangeForm={onChangeForm}
      onSubmit={onSubmit}
    />
  );
}

export default WriteFormContainer;

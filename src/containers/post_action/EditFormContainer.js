import React, { useEffect, useState, useCallback } from "react";
import EditForm from "../../components/post_action/EditForm";
import { useSelector, useDispatch } from "react-redux";
import {
  changeForm,
  clearCheck,
  clearError,
  checkUpdate,
  unloadPost,
} from "../../modules/post_action";
import { withRouter } from "react-router-dom";

function EditFormContainer({ history }) {
  const [inputError, setInputError] = useState(null);
  const dispatch = useDispatch();
  const { id, password, error } = useSelector(({ postAction }) => ({
    id: postAction.postId,
    password: postAction.password,
    error: postAction.error,
    // loading: loading["postAction/CHECK_WRITE"],
  }));

  const onChangeForm = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeForm({ name, value }));
    },
    [dispatch]
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!password || password.trim() === "") {
        setInputError("비밀번호를 입력해 주세요.");
        return;
      }
      dispatch(checkUpdate({ id, password }));
    },
    [dispatch, id, password]
  );

  useEffect(() => {
    if (error) {
      if (error.response.status === 401) {
        setInputError("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (error.response.status === 404) {
        alert("존재하지 않는 포스트입니다.");
        history.push("/");
        return;
      }

      setInputError(
        "서버 상태가 원활하지 않습니다. 나중에 다시 시도해 주세요."
      );
      return;
    }
  }, [error, history]);

  return (
    <EditForm
      password={password || ""}
      inputError={inputError}
      onChangeForm={onChangeForm}
      onSubmit={onSubmit}
    />
  );
}

export default withRouter(EditFormContainer);

import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePost, clearCheck, unloadPost } from "../../modules/post_action";
import WriteEditor from "../../components/post_action/WriteEditor";

function WriteEditorContainer(props) {
  const dispatch = useDispatch();
  const { write, edit, postId } = useSelector(({ postAction }) => postAction);
  const action = postId ? "edit" : "write";

  const onChangePost = useCallback(
    ({ action, name, value }) => {
      dispatch(changePost({ action, name, value }));
    },
    [dispatch]
  );
  const onChangeTitle = useCallback(
    (e) => {
      const { name, value } = e.target;
      onChangePost({ action, name, value });
    },
    [onChangePost, action]
  );
  const onChangeBody = useCallback(
    (value) => {
      onChangePost({ action, name: "body", value });
    },
    [onChangePost, action]
  );

  return (
    <WriteEditor
      post={postId ? edit : write}
      onChangeTitle={onChangeTitle}
      onChangeBody={onChangeBody}
    />
  );
}

export default WriteEditorContainer;

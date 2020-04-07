import React, { useEffect, useCallback } from "react";
import PostWrite from "../../components/post_action/PostWrite";
import { useDispatch, useSelector } from "react-redux";
import { clearCheck, unloadPost, changePost } from "../../modules/post_action";

function PostWriteContainer() {
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

  useEffect(() => {
    return () => {
      dispatch(clearCheck());
      dispatch(unloadPost());
    };
  }, [dispatch]);

  return (
    <PostWrite
      action={action}
      post={postId ? edit : write}
      onChangeTitle={onChangeTitle}
      onChangeBody={onChangeBody}
    />
  );
}

export default PostWriteContainer;

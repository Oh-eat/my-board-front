import React, { useEffect } from "react";
import WriteFormContainer from "../containers/post_action/WriteFormContainer";
import FormTemplate from "../components/common/FormTemplate";
import { useSelector, useDispatch } from "react-redux";
import WriteEditorContainer from "../containers/post_action/WriteEditorContainer";
import TagBoxContainer from "../containers/post_action/TagBoxContainer";
import WriteActionButtonsContainer from "../containers/post_action/WriteActionButtonsContainer";
import EditFormContainer from "../containers/post_action/EditFormContainer";
import { unloadPost, clearCheck } from "../modules/post_action";

function WritePage(props) {
  const dispatch = useDispatch();
  const { postId, permission, user } = useSelector(({ postAction, user }) => ({
    postId: postAction.postId,
    permission: postAction.permission,
    user: user.user,
  }));

  useEffect(() => {
    return () => {
      dispatch(clearCheck());
      dispatch(unloadPost());
    };
  }, [dispatch]);

  if (postId) {
    if (!permission && !user) {
      return (
        <FormTemplate>
          <EditFormContainer />
        </FormTemplate>
      );
    }

    return (
      <>
        <WriteEditorContainer />
        <TagBoxContainer />
        <WriteActionButtonsContainer />
      </>
    );
  }

  return (
    <>
      {!permission && !user && (
        <FormTemplate>
          <WriteFormContainer />
        </FormTemplate>
      )}
      {(permission || user) && (
        <>
          <WriteEditorContainer />
          <TagBoxContainer />
          <WriteActionButtonsContainer />
        </>
      )}
    </>
  );
}

export default WritePage;

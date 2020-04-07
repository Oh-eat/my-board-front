import React from "react";
import PostWriteContainer from "../containers/post_action/PostWriteContainer";
import WriteFormContainer from "../containers/post_action/WriteFormContainer";
import FormTemplate from "../components/common/FormTemplate";
import { useSelector } from "react-redux";

function WritePage(props) {
  const { permission, user } = useSelector(({ postAction, user }) => ({
    permission: postAction.permission,
    user: user.user,
  }));

  return (
    <>
      {!permission && !user && (
        <FormTemplate>
          <WriteFormContainer />
        </FormTemplate>
      )}
      {(permission || user) && <PostWriteContainer />}
    </>
  );
}

export default WritePage;

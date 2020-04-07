import React, { useEffect } from "react";
import WriteActionButtons from "../../components/post_action/WriteActionButtons";
import { withRouter } from "react-router-dom";

function WriteActionButtonsContainer({ history }) {
  const onGoBack = () => history.goBack();

  useEffect(() => {
    const unblock = history.block("작성 중인 내용을 잃게 됩니다.");
    return () => {
      unblock();
    };
  }, [history]);

  return <WriteActionButtons onGoBack={onGoBack} />;
}

export default withRouter(WriteActionButtonsContainer);

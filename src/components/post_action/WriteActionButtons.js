import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import styled from "styled-components";
import Button from "../common/Button";
import { TiPencil } from "react-icons/ti";

const WriteActionButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  width: 100%;

  .error {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: red;
    font-size: 0.9rem;
  }

  .buttons {
    display: flex;
    margin-left: 1rem;
  }
`;

function WriteActionButtons({ inputError, onGoBack, onSubmit }) {
  return (
    <WriteActionButtonsBlock>
      <div className="error">{inputError || ""}</div>
      <div className="buttons">
        <Button width="5rem" height="2.5rem" onClick={onGoBack}>
          <IoMdArrowBack size="1.5rem" />
        </Button>
        <Button width="5rem" height="2.5rem" onClick={onSubmit}>
          <TiPencil size="1.5rem" />
        </Button>
      </div>
    </WriteActionButtonsBlock>
  );
}

export default React.memo(WriteActionButtons);

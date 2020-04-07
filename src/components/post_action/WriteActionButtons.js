import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import styled from "styled-components";
import Button from "../common/Button";
import { TiPencil } from "react-icons/ti";

const WriteActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;

  button + button {
    margin-left: 0.75rem;
  }
`;

function WriteActionButtons({ onGoBack }) {
  return (
    <WriteActionButtonsBlock>
      <Button width="5rem" height="2.5rem" onClick={onGoBack}>
        <IoMdArrowBack size="1.5rem" />
      </Button>
      <Button width="5rem" height="2.5rem">
        <TiPencil size="1.5rem" />
      </Button>
    </WriteActionButtonsBlock>
  );
}

export default React.memo(WriteActionButtons);

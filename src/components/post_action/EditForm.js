import React from "react";
import styled from "styled-components";
import { IoMdLock } from "react-icons/io";
import Button from "../common/Button";
import InputWithIcon from "../common/InputWithIcon";

const EditFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .help {
    margin-top: 0.1rem;
    font-size: 0.75rem;
    color: rgb(160, 160, 160);
  }

  .error {
    color: red;
    text-align: center;
    font-size: 0.75rem;
    margin-top: 1rem;
  }
`;

function EditForm({ password, inputError, onSubmit, onChangeForm }) {
  return (
    <EditFormBlock>
      <h2>포스트 수정</h2>
      <form onSubmit={onSubmit}>
        <InputWithIcon
          icon={<IoMdLock size="1.5rem" />}
          name="password"
          value={password}
          type="password"
          placeholder="포스트 비밀번호"
          maxLength={15}
          onChange={onChangeForm}
          alnumOnly
        />
        {inputError && <div className="error">{inputError}</div>}
        <Button fluid type="submit">
          계속
        </Button>
      </form>
    </EditFormBlock>
  );
}

export default EditForm;

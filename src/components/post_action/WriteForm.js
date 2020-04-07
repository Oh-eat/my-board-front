import React from "react";
import styled from "styled-components";
import { FaUserAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import Button from "../common/Button";
import InputWithIcon from "../common/InputWithIcon";

const WriteFormBlock = styled.div`
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

function WriteForm({ username, password, inputError, onSubmit, onChangeForm }) {
  return (
    <WriteFormBlock>
      <h2>포스트 작성</h2>
      <form onSubmit={onSubmit}>
        <InputWithIcon
          icon={<FaUserAlt />}
          name="username"
          value={username}
          placeholder="작성자명"
          maxLength={15}
          onChange={onChangeForm}
        />
        <InputWithIcon
          icon={<IoMdLock size="1.5rem" />}
          name="password"
          value={password}
          type="password"
          placeholder="포스트 비밀번호"
          maxLength={15}
          onChange={onChangeForm}
        />
        {inputError && <div className="error">{inputError}</div>}
        <Button fluid type="submit">
          계속
        </Button>
      </form>
    </WriteFormBlock>
  );
}

export default WriteForm;

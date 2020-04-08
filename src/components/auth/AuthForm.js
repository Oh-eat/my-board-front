import React from "react";
import styled from "styled-components";
import { FaUserAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import InputWithIcon from "../common/InputWithIcon";

const AuthFormBlock = styled.div`
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

  .footer {
    margin-top: 1rem;
    text-align: center;
    color: rgb(120, 120, 120);
    text-decoration: underline;
    a:hover {
      color: rgb(160, 160, 160);
    }
  }
`;

const textMap = {
  login: "로그인",
  register: "회원가입",
};

function AuthForm({
  type,
  username,
  password,
  passwordConfirm,
  inputError,
  onSubmit,
  onChangeField,
}) {
  const text = textMap[type];

  return (
    <AuthFormBlock>
      <h2>{text}</h2>
      <form onSubmit={onSubmit}>
        <InputWithIcon
          icon={<FaUserAlt />}
          name="username"
          value={username}
          placeholder="아이디"
          maxLength={15}
          onChange={onChangeField}
          alnumOnly
        />
        {/* {type === "register" && (
          <div className="help">2 ~ 15자의 알파벳 또는 숫자</div>
        )} */}
        <InputWithIcon
          icon={<IoMdLock size="1.5rem" />}
          name="password"
          value={password}
          type="password"
          placeholder="비밀번호"
          maxLength={15}
          onChange={onChangeField}
          alnumOnly
        />
        {/* {type === "register" && <div className="help">4 ~ 15자</div>} */}
        {type === "register" && (
          <InputWithIcon
            icon={<IoMdLock size="1.5rem" />}
            name="passwordConfirm"
            value={passwordConfirm}
            type="password"
            placeholder="비밀번호 확인"
            maxLength={15}
            onChange={onChangeField}
            alnumOnly
          />
        )}
        {/* {type === "register" && (
          <div className="help">비밀번호와 동일해야 합니다</div>
        )} */}
        {inputError && <div className="error">{inputError}</div>}
        <Button fluid type="submit">
          {text}
        </Button>
      </form>
      <div className="footer">
        {type === "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
    </AuthFormBlock>
  );
}

export default AuthForm;

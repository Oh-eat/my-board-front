import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 0.5rem;
  width: calc(100% - 2.5rem);
`;

const InputWithIconBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  border: 2px solid dodgerblue;
  width: 100%;

  .icon {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: dodgerblue;
  }
`;

function InputWithIcon({
  icon,
  name,
  value,
  type = "text",
  placeholder,
  maxLength,
  onChange,
}) {
  return (
    <InputWithIconBlock>
      <span className="icon">{icon}</span>
      <StyledInput
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        spellCheck={false}
        maxLength={maxLength}
        onChange={onChange}
      />
    </InputWithIconBlock>
  );
}

export default InputWithIcon;

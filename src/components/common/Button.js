import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import styles from "../../lib/styles";

const buttonStyle = css`
  outline: none;
  border: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 2.5rem;

  &:disabled {
    background: rgb(200,200,200);
    cursor:initial;
    
    &:hover {
      background: rgb(200,200,200);
    }
  }

  ${(props) =>
    props.color
      ? css`
          background: ${styles.button.color[props.color].normal};
          &:hover {
            background: ${styles.button.color[props.color].hover};
          }
        `
      : css`
          background: ${styles.button.color.blue.normal};
          &:hover {
            background: ${styles.button.color.blue.hover};
          }
        `}

    ${(props) =>
      props.transparent &&
      css`
        background: transparent;
        color: ${styles.button.transparent.normal};
        &:hover {
          background: transparent;
          color: ${styles.button.transparent.hover};
        }
      `}

    ${(props) =>
      props.width &&
      css`
        width: ${props.width};
      `}


    ${(props) =>
      props.height &&
      css`
        height: ${props.height};
      `}

  ${(props) =>
    props.fluid &&
    css`
      margin-top: 1rem;
      width: 100%;
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}

  & + & {
    margin-left: 0.75rem;
  }

  & + a {
    margin-left: 0.75rem;
  }
`;

const StyledLink = styled(Link)`
  ${buttonStyle}

  &+& {
    margin-left: 0.75rem;
  }

  & + button {
    margin-left: 0.75rem;
  }
`;

function Button({ to, ...props }) {
  return to ? <StyledLink to={to} {...props} /> : <StyledButton {...props} />;
}

export default Button;

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
    props.fluid &&
    css`
      margin-top: 1rem;
      width: 100%;
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

function Button({ to, ...props }) {
  return to ? <StyledLink to={to} {...props} /> : <StyledButton {...props} />;
}

export default Button;

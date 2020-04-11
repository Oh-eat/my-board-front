import React from "react";
import styled from "styled-components";
import styles from "../../lib/styles";
import { withRouter } from "react-router-dom";

const TagBlock = styled.div`
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  margin-right: 0.25rem;
  margin-bottom: ${(props) => (props.withMarginBottom ? "0.25rem" : "0")};
  background: dodgerblue;
  color: white;
  font-size: ${(props) => props.fontSize || "0.9rem"};
  cursor: pointer;
  display: inline-block;
  user-select: none;

  &:hover {
    background: ${styles.button.color.blue.hover};
  }

  @media (max-width: 768px) {
    max-width: 6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }
`;

function Tag({ tag, fontSize, onClick, history }) {
  const defaultClick = () => {
    history.push(`/post?tag=${tag}`);
  };

  return (
    <TagBlock fontSize={fontSize} onClick={onClick || defaultClick}>
      # {tag}
    </TagBlock>
  );
}

export default React.memo(withRouter(Tag));

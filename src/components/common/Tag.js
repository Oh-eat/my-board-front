import React from "react";
import styled from "styled-components";
import styles from "../../lib/styles";

const TagBlock = styled.div`
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  margin-right: 0.25rem;
  background: dodgerblue;
  color: white;
  font-size: ${(props) => props.fontSize || "0.9rem"};
  cursor: pointer;
  display: inline-block;
  user-select: none;

  &:hover {
    background: ${styles.button.color.blue.hover};
  }
`;

function Tag({ tag, fontSize, onClick }) {
  return (
    <TagBlock fontSize={fontSize} onClick={onClick}>
      # {tag}
    </TagBlock>
  );
}

export default React.memo(Tag);

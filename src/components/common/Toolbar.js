import React from "react";
import styled from "styled-components";

const ToolbarBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;

  button,
  a {
    width: 2.5rem;
    height: 2.5rem;
  }

  .left,
  .right {
    display: flex;
  }
`;

function Toolbar({ children }) {
  return <ToolbarBlock>{children}</ToolbarBlock>;
}

export default Toolbar;

import React from "react";
import styled from "styled-components";

const AuthTemplateBlock = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  width: 300px;
  min-width: 300px;
  height: auto;
  padding: 2rem;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
`;

function AuthTemplate({ children }) {
  return (
    <AuthTemplateBlock>
      <WhiteBox>{children}</WhiteBox>
    </AuthTemplateBlock>
  );
}

export default AuthTemplate;

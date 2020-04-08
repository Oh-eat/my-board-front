import React from "react";
import styled from "styled-components";
import styles from "../../lib/styles";

const FormTemplateBlock = styled.div`
  height: calc(100vh - ${styles.header.height} - ${styles.wrapper.marginTop}*2);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  height: auto;
  padding: 2rem;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
`;

function FormTemplate({ children, width = "300px" }) {
  return (
    <FormTemplateBlock>
      <WhiteBox width={width}>{children}</WhiteBox>
    </FormTemplateBlock>
  );
}

export default FormTemplate;

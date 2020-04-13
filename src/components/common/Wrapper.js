import React from "react";
import styled from "styled-components";
import styles from "../../lib/styles";

const OuterWrapper = styled.main`
  min-height: calc(
    100% - ${styles.header.height} - ${styles.wrapper.marginTop}*2
  );
  margin-top: ${styles.wrapper.marginTop};
  margin-bottom: ${styles.wrapper.marginTop};
  margin-left: ${styles.wrapper.marginLeft};
  margin-right: ${styles.wrapper.marginRight};
`;

const InnerWrapper = styled.div`
  height: 100%;
  max-width: ${styles.contents.maxWidth};
  margin-left: auto;
  margin-right: auto;
`;

function Wrapper({ children }) {
  return (
    <OuterWrapper>
      <InnerWrapper>{children}</InnerWrapper>
    </OuterWrapper>
  );
}

export default Wrapper;

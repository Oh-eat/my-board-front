import React from "react";
import styled from "styled-components";

const Fullscreen = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;

  .buttons {
    display: flex;
  }
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
`;

function Modal({ title, children }) {
  return (
    <Fullscreen>
      <WhiteBox>
        <Title>{title}</Title>
        {children}
      </WhiteBox>
    </Fullscreen>
  );
}

export default Modal;

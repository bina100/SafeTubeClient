import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
  overflow: hidden;
  background: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 35%;
  height: 50%;
  z-index: 1001;
  background: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 480px) {
    width: 90%;
  }
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  margin: 10px;
`;
const Div = styled.div`
  margin: auto;
  border: none;
  display: flex;
  height: 70%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;

const PopUp = ({ close, children }) => (
  <Container>
    <Wrapper>
      {close ? (
        <Close onClick={close} className="close-popup">
          <CloseOutlinedIcon />
        </Close>
      ) : null}
      <Div className="children-popup">{children}</Div>
    </Wrapper>
  </Container>
);

export default PopUp;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Popup from "../popup/Popup";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.bgLighter};
  height: 85vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  margin: 0;
  padding: 20px;
`;

const Button = styled.button`
  margin-top: 5%;
  border: none;
  color: ${({ theme }) => theme.textSoft};
  background: ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
`;
const Div = styled.div``;
const P = styled.p`
  color: ${({ theme }) => theme.textSoft};
`;
const TextArea = styled.textarea`
  width: 50%;
  height: 10em;
  color: ${({ theme }) => theme.textSoft};
  background: ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px 20px;
  @media (max-width: 480px) {
    width: 80%;
  }
`;
const H1 = styled.h1`
  color: ${({ theme }) => theme.textSoft};
`;

const Feedback = () => {
  const textareaRef = useRef(null);
  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (openPopup) {
      const timeoutId = setTimeout(() => {
        setOpenPopup(false);
        navigate("/");
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [openPopup]);

  const handleSendFeedback = () => {
    console.log(textareaRef.current.value);
    setOpenPopup(true);
  };
  return (
    <Container>
      <Div>
        <P>Feedback description:</P>
        <TextArea
          ref={textareaRef}
          placeholder="Please let us know what caused you to send this feedback..."
        ></TextArea>
      </Div>
      <Button onClick={handleSendFeedback}>Send</Button>
      {openPopup ? (
        <Popup close={() => setOpenPopup(false)}>
          <H1>Thank you for your feedback!</H1>
        </Popup>
      ) : null}
    </Container>
  );
};

export default Feedback;

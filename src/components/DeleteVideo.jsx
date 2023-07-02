import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, TOKEN_NAME } from "../services/apiService";
import styled from "styled-components";
import axios from "axios";
import SelectTags from "./SelectTags";
import Popup from "../popup/Popup";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 35%;
  height: 50%;
  background: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
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

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background: transparent;
  margin-top: 20px;
`;

const Button = styled.button`
  border: none;
  color: ${({ theme }) => theme.textSoft};
  background: ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
`;
const Div = styled.div`
  margin: auto;
  display: flex;
  height: 70%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const DeleteVideo = ({ setOpenDelete }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [errorData, setErrorData] = useState("");
  const [video, setVideo] = useState(undefined);
  const token = localStorage.getItem(TOKEN_NAME);

  const navigate = useNavigate();
  useEffect(() => {
    if (isOpenPopup) {
      const timeoutId = setTimeout(() => {
        setIsOpenPopup(false);
        setOpenDelete(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpenPopup]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `${API_URL}/videos/delete-video/${video}`,
        {
          headers: {
            "x-api-key": token,
          },
        }
      );
      setOpenDelete(false);
      res.status === 200 &&
        alert("sucsses delete video") &&
        navigate(`/admin/home`);
    } catch (err) {
      setIsOpenPopup(true);
      console.log(err);
      setErrorData(err.response.data.message);
      navigate("/admin/home");
    }
  };

  const handleChange = (e) => {
    setVideo(e.target.value);
  };

  return (
    <Container>
      <Wrapper>
        <Close
          onClick={() => {
            setOpenDelete(false);
          }}
        >
          X
        </Close>
        <Div>
          <Input
            type="text"
            placeholder="video id"
            onChange={handleChange}
            name="videoUrl"
            value={video}
          />
          <Button onClick={handleDelete}>Delete</Button>
          {isOpenPopup ? (
            <Popup close={() => setIsOpenPopup(false)}>
              <p>{errorData}</p>
            </Popup>
          ) : null}
        </Div>
      </Wrapper>
    </Container>
  );
};

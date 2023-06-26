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

export const UploadVideoData = ({ setOpen }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupData, setPopupData] = useState("");
  const [video, setVideo] = useState(undefined);
  const [tags, setTags] = useState([]);
  const token = localStorage.getItem(TOKEN_NAME);

  const navigate = useNavigate();
  useEffect(() => {
    if (isOpenPopup) {
      const timeoutId = setTimeout(() => {
        setIsOpenPopup(false);
        setOpen(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpenPopup]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const dataVideo = await getDataVideo();
    try {
      const res = await axios.post(
        `${API_URL}/videos`,
        {
          data: {
            ...dataVideo,
            tags,
          },
        },
        {
          headers: {
            "x-api-key": token,
          },
        }
      );
      setOpen(false);
      res.status === 200 
      && alert("sucsses add video") 
      // && navigate(`/admin/home`) 
      // && navigate(`/video/${res.data._id}`);
    } catch (err) {
      setIsOpenPopup(true);
      console.log(err);
      setPopupData(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    setVideo(e.target.value);
  };

  const getDataVideo = async () => {
    try {
      const videoDetailsResponse = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "snippet",
            id: video,
            key: "AIzaSyCThWWxhVBeQXD_73Oq1i9N8w-TJZJ2DFg",
          },
        }
      );
      const videoDetailsItems = videoDetailsResponse.data.items[0];
      const obj = {
        title: videoDetailsItems.snippet.title,
        imgUrl: videoDetailsItems.snippet.thumbnails.medium.url,
        desc: videoDetailsItems.snippet.description,
        videoUrl: video,
        createdAt: videoDetailsItems.snippet.publishedAt,
        channelTitle: videoDetailsItems.snippet.channelTitle,
      };

      // to get channel image
      const channelImg = await channelData(videoDetailsItems.snippet.channelId);
      const objData = { ...obj, channelImg: channelImg };
      return objData;
    } catch (error) {
      alert("Failed to fetch videos", error)
      console.error("Failed to fetch videos", error);
    }
  };

  const channelData = async (channelId) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=AIzaSyCThWWxhVBeQXD_73Oq1i9N8w-TJZJ2DFg`
      );
      const channel = response.data.items[0];
      const image = channel.snippet.thumbnails.default.url;
      return image;
    } catch (error) {
      console.error("Error fetching channel image:", error);
    }
  };
  // ToDo: We would like to upload Excel with the information of the ID`s list of videos
  return (
    <Container>
      <Wrapper>
        <Close
          onClick={() => {
            setOpen(false);
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
          <SelectTags setTags={setTags} />
          <Button onClick={handleUpload}>Upload</Button>
          {isOpenPopup ? (
            <Popup close={() => setIsOpenPopup(false)}>
              <p>{popupData}</p>
            </Popup>
          ) : null}
        </Div>
      </Wrapper>
    </Container>
  );
};

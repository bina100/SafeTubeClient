import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import demoChannel from "../img/demoChannel.jpg";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";
import { API_URL, TOKEN_NAME } from "../services/apiService";

import {
  dislike,
  fetchFailure,
  fetchStart,
  fetchSuccess,
  like,
} from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
  @media (max-width: 768px) {
    flex: 12;
  }
`;
const VideoWrapper = styled.div``;
const Iframe = styled.iframe`
  width: 100%;
  max-height: 600px;
  cursor: pointer;
  @media (max-width: 990px) {
    height: 400px;
  }
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 990px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const HR = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Description = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  background: #cc1a00;
  font-weight: 500;
  color: white;
  border-radius: 3px;
  border: none;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const linesDesc = currentVideo ? currentVideo.desc.split("\n") : "";
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const videoRes = await axios.get(
          `${API_URL}/videos/find/${path}`
          // {
          //   headers: {
          //     "x-api-key": token,
          //   },
          // }
        );

        const channelRes = await axios.get(
          `${API_URL}/users/find/${videoRes.data.userId}`
          // {
          //   headers: {
          //     "x-api-key": token,
          //   },
          // }
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        dispatch(fetchFailure());
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(
      `${API_URL}/users/like/${currentVideo._id}`,
      { userId: currentUser._id },
      {
        headers: {
          "x-api-key": token,
        },
      }
    );
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(
      `${API_URL}/users/dislike/${currentVideo._id}`,
      { userId: currentUser._id },
      {
        headers: {
          "x-api-key": token,
        },
      }
    );
    dispatch(dislike(currentUser._id));
  };

  const handleSubscribe = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(
          `${API_URL}/users/unsub/${channel._id}`,
          { userId: currentUser._id },
          {
            headers: {
              "x-api-key": token,
            },
          }
        )
      : await axios.put(
          `${API_URL}/users/sub/${channel._id}`,
          { userId: currentUser._id },
          {
            headers: {
              "x-api-key": token,
            },
          }
        );
    dispatch(subscription(channel._id));
  };
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <Container>
      {currentVideo ? (
        <Content>
          <VideoWrapper>
            <YouTube videoId={currentVideo.videoUrl} opts={opts} />
          </VideoWrapper>
          <Title>{currentVideo.title}</Title>
          <Details>
            <Info>
              {/* {currentVideo.views} views -  */}
              {format(currentVideo.createdAt)}
            </Info>
            <Buttons>
              <Button onClick={handleLike}>
                {currentUser &&
                currentVideo.likes?.includes(currentUser._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}{" "}
                {currentVideo.likes?.length}
              </Button>
              <Button onClick={handleDislike}>
                {currentUser &&
                currentVideo.dislikes?.includes(currentUser._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltOutlinedIcon />
                )}{" "}
                {currentVideo.dislikes?.length}
              </Button>
              <Button>
                <ReplayOutlinedIcon /> Share
              </Button>
              <Button>
                <AddTaskOutlinedIcon /> Save
              </Button>
            </Buttons>
          </Details>
          <HR />
          <Channel>
            <ChannelInfo>
              <Image src={currentVideo.channelImg} />
              <ChannelDetail>
                <ChannelName>{currentVideo.channelTitle}</ChannelName>
                {/* <ChannelName>{channel.name}</ChannelName> */}
                <ChannelCounter>
                  {channel.subscribers} subscribers
                </ChannelCounter>
                <Description>
                  {linesDesc.map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                  {/* {currentVideo.desc} */}
                </Description>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe onClick={handleSubscribe}>
              {currentUser && currentUser.subscribedUsers?.includes(channel._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Subscribe>
          </Channel>
          <HR />
        </Content>
      ) : null}
      {currentVideo ? (
        <div>
          <Recommendation tags={currentVideo.tags} videoId={currentVideo._id} />
        </div>
      ) : null}
    </Container>
  );
};

export default Video;

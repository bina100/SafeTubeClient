import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import { API_URL } from "../services/apiService";

const Container = styled.div`
  /* width: 360px; */
  /* width: 31%; */
  width: ${(props) => props.type !== "sm" && "30%"};
  margin: 0px 1%;
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "24px")};
  cursor: pointer;
  @media (max-width: 768px) {
    width: 48%;
  }
  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 12px;
  }
`;
const DataCard = styled.div`
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;
const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "100px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
  @media (max-width: 480px) {
    margin-top: 4px;
  }
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  width: 85%;
`;
const Title = styled.h2`
  font-size: 16px;
  margin: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ChannelName = styled.h3`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 4px 0px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const Card = ({ type, video }) => {
  
  return (
    <Container type={type}>
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
        <DataCard type={type}>
          <Image src={video.imgUrl} type={type} />
          <Details type={type}>
            <ChannelImage type={type} src={video.channelImg} />
            <Texts>
              <Title>{video.title}</Title>
              <ChannelName>{video.channelTitle}</ChannelName>
              <Info>
                {/* {video.views} views -  */}
                {format(video.createdAt)}
              </Info>
            </Texts>
          </Details>
        </DataCard>
      </Link>
    </Container>
  );
};

export default Card;

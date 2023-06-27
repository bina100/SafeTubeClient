import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, TOKEN_NAME } from "../services/apiService";
import Card from "./Card";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const H1 = styled.h1`
    align-items: center;
    width: 100%;
    margin-top: 10%;
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.textSoft};
`

const History = () => {
  const token = localStorage.getItem("token");

  const [historyVideos, setHistoryVideos] = useState([]);
  useEffect(() => {
    getHistoryVideos();
  }, []);

  const getHistoryVideos = async () => {
    const videos = await axios.get(`${API_URL}/users/history`, {
      headers: {
        "x-api-key": token,
      },
    });
    setHistoryVideos(videos.data);
  };

  return (
    <Container>
      {historyVideos.length > 0 ? (
        <>
          {historyVideos.map((video) => 
            <Card key={video._id} video={video} />
          )}
        </>
      ) : <H1>You have no history</H1>}
    </Container>
  );
};

export default History;

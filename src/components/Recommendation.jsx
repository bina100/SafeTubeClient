import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";
import { API_URL } from "../services/apiService";

const Container = styled.div`
  flex: 2;
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

function Recommendation({ tags, videoId }) {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${API_URL}/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);
  return (
    <Container>
      {videos.map((video) =>
        video._id != videoId ? (
          <Card type="sm" key={video._id} video={video} />
        ) : null
      )}
    </Container>
  );
}

export default Recommendation;

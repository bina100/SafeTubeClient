import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { API_URL } from "../services/apiService";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  /* cursor: pointer; 
  @media (max-width: 768px) {
    width: 48%;
  }
  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 12px;
  } */
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `${API_URL}/videos/search${query}`
      );
      console.log(res.data);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;

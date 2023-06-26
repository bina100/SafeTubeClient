import React from "react";
import styled from "styled-components";

const H2 = styled.h2`
  text-align: center;
  font-size: 45px;
  margin-top: 25%;
  color: ${({ theme }) => theme.text};
`;
const PageNotFound = () => {
  return <H2> 404 Page not found</H2>;
};
export default PageNotFound;

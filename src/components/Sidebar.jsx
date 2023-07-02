import React from "react";
import styled from "styled-components";
import SafeTube from "../img/safeTubeLogo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import CastConnectedOutlinedIcon from "@mui/icons-material/CastConnectedOutlined";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LandscapeOutlinedIcon from "@mui/icons-material/LandscapeOutlined";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.bgLighter};
  /* height: 100vh; */
  min-height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  @media (max-width: 480px) {
    flex: 0.5;
  }
`;

const Wrapper = styled.div`
  padding: 8px 16px;
  @media (max-width: 480px) {
    padding: 8px 4px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 3px 0px;

  &:hover {
    background: ${({ theme }) => theme.soft};
  }
`;
const Hr = styled.hr`
  margin: 4px 0px;
  border: 1px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div`
  font-size: 10px;
`;
const LoginBtn = styled.button`
  padding: 4px 12px;
  background: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 5px;
  font-weight: 500;
  margin-top: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 10px;
`;
const H3 = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  margin: 0;
  padding: 0;
  display: flex;
  @media (max-width: 480px) {
    display: none;
  }
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={SafeTube} />
            <H3>SafeTube</H3>
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            <H3>Home</H3>
          </Item>
        </Link>
        <Link to="trend" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            <H3>Explore</H3>
          </Item>
        </Link>
        {/* <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsIcon />
            Subscriptions
          </Item>
        </Link> */}
        <Hr />
        {/* <Item>
          <VideoLibraryIcon />
          Library
        </Item> */}
        <Link to="history" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HistoryOutlinedIcon />
            <H3>History</H3>
          </Item>
        </Link>
        <Hr />
        {!currentUser && (
          <H3>
            <Login>
              Sign in to like videos, and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <LoginBtn>
                  <AccountCircleOutlinedIcon /> SIGN IN
                </LoginBtn>
              </Link>
            </Login>
            <Hr />
          </H3>
        )}
        <Link
          to="tags_study"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SchoolOutlinedIcon />
            <H3>Study</H3>
          </Item>
        </Link>
        <Link
          to="tags_music"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <LibraryMusicOutlinedIcon />
            <H3>Music</H3>
          </Item>
        </Link>
        <Link
          to="tags_torah"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <CastForEducationOutlinedIcon />
            <H3>Torah</H3>
          </Item>
        </Link>
        <Link
          to="tags_advertising"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <CastConnectedOutlinedIcon />
            <H3>Advertising</H3>
          </Item>
        </Link>
        <Link
          to="tags_instructions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <IntegrationInstructionsOutlinedIcon />
            <H3>Instructions</H3>
          </Item>
        </Link>
        <Link
          to="tags_nature"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <LandscapeOutlinedIcon />
            <H3>Nature</H3>
          </Item>
        </Link>
        <Link
          to="tags_recipe"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <ReceiptOutlinedIcon />
            <H3>Recipe</H3>
          </Item>
        </Link>
        <Link
          to="tags_company"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <BusinessOutlinedIcon />
            <H3>Company</H3>
          </Item>
        </Link>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          <H3>Settings</H3>
        </Item>
        <Link
          to="https://support.google.com/youtube/?hl=en#topic=9257498"
          target="blank"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <HelpOutlineIcon />
            <H3>Help</H3>
          </Item>
        </Link>
        <Link
          to="feedback"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <FeedbackOutlinedIcon />
            <H3>Feedback</H3>
          </Item>
        </Link>
        <Hr />
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          <H3>{darkMode ? "Light " : "Dark"} Mode</H3>
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;

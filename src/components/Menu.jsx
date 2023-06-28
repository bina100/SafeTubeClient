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
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 8px 16px;
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

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={SafeTube} />
            SafeTube
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link to="trend" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
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
            History
          </Item>
        </Link>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <LoginBtn>
                  <AccountCircleOutlinedIcon /> SIGN IN
                </LoginBtn>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Link
          to="tags_study"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SchoolOutlinedIcon />
            Study
          </Item>
        </Link>
        <Link
          to="tags_music"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
        </Link>
        <Link
          to="tags_torah"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <CastForEducationOutlinedIcon />
            Torah
          </Item>
        </Link>
        <Link
          to="tags_advertising"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <CastConnectedOutlinedIcon />
            Advertising
          </Item>
        </Link>
        <Link
          to="tags_instructions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <IntegrationInstructionsOutlinedIcon />
            Instructions
          </Item>
        </Link>
        <Link
          to="tags_nature"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <LandscapeOutlinedIcon />
            Nature
          </Item>
        </Link>
        <Link
          to="tags_recipe"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <ReceiptOutlinedIcon />
            Recipe
          </Item>
        </Link>
        <Link
          to="tags_company"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <BusinessOutlinedIcon />
            Company
          </Item>
        </Link>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Link
          to="https://support.google.com/youtube/?hl=en#topic=9257498"
          target="blank"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <HelpOutlineIcon />
            Help
          </Item>
        </Link>
        <Link
          to="feedback"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <FeedbackOutlinedIcon />
            Feedback
          </Item>
        </Link>
        <Hr />
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light " : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;

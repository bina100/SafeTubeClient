import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Upload } from "./Upload";
import { UploadVideoData } from "./UploadVideoData";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.bgLighter};
  height: 56px;
   @media (max-width: 480px) {
    position: sticky;
    width: 100%;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    width: 10%;
    border: none;
    position: relative;
    margin: 0;
    justify-content: flex-end;
  }
`;
const Input = styled.input`
  border: none;
  font-size: 16px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const Button = styled.button`
  padding: 0px 12px;
  background: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  @media (max-width: 768px) {
    border: none;
  }
`;

const P = styled.p`
  display: flex;
  margin: 0;
  padding: 9.5px 2px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    /* display: none; */
  }
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #999;
`;
const Span = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => theme.text};
  /* &:hover:after {
    content: "Logout";
    color: gray;
    border: ${({ theme }) => theme.text};
    position: absolute;
    bottom: -20px;
    right: 0px;
  } */
`;
const Admin = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => theme.text};
`;



const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
  const handleSearch = (e) => {
    setQ(e.target.value);
    navigate(`/search?q=${q}`);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={handleSearch} />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? (
            <User>
              {/* <VideoCallOutlinedIcon
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
              /> */}
              {currentUser.img ? <Avatar src={currentUser.img} /> : null}
              {currentUser?.role == "safeTubeAdmin" ? (
                <Admin onClick={() => navigate("/admin/home")}>
                  {currentUser.name}
                </Admin>
              ) : (
                currentUser.name
              )}
              <Span onClick={handleLogout}>
                <LogoutOutlinedIcon />
              </Span>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                <P>SIGN IN</P>
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open ? <UploadVideoData setOpen={setOpen} /> : null}
    </>
  );
};

export default Navbar;

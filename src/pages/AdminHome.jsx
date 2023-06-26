import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PageNotFound from "./PageNotFound";
import { UploadVideoData } from "../components/UploadVideoData";
import { DeleteVideo } from "../components/DeleteVideo";
import UsersList from "./UsersList";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 20px;
  flex-direction: column;
`;
const Button = styled.button`
  width: 80%;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 10px;
  margin: 12px;
  padding: 12px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.text};
  background: transparent;
`;
// const Link = styled.link`
//   width: 80%;
//   border: 1px solid rgb(204, 204, 204);
//   border-radius: 10px;
//   margin: 12px;
//   padding: 12px;
//   text-align: center;
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
//   color: ${({ theme }) => theme.text};
//   background: transparent;
// `;

const AdminHome = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  let navigate = useNavigate(); 

  return (
    <Container>
      {currentUser?.role === "safeTubeAdmin" ? (
        <>
          <Button onClick={() => setOpen(true)}>Add new video</Button>
          <Button onClick={()=>setOpenDelete(true)}>Delete video</Button>
          <Button onClick={()=>navigate('/admin/users')}>Show all users</Button>
        </>
      ) : (
        <PageNotFound />
      )}
      {open ? <UploadVideoData setOpen={setOpen} /> : null}
      {openDelete ? <DeleteVideo setOpenDelete={setOpenDelete} /> : null}
    </Container>
  );
};
export default AdminHome;

import React, { useEffect, useState } from "react";
import { API_URL, TOKEN_NAME, ADMIN } from "../services/apiService";
import styled from "styled-components";
import axios from "axios";
import Popup from "../popup/Popup";

const Tr = styled.tr`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bgLighter};

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.table};
  }

  &:hover {
    background-color: ${({ theme }) => theme.tableHover};
  }
`;
const Td = styled.td`
  color: ${({ theme }) => theme.text};
  padding: 4px 8px;
`;
const Button = styled.button`
  color: ${({ theme }) => theme.text};
  background: transparent;
  border: none;
  font-weight: bold;
`;

export default function UserItem(props) {
  let item = props.item;
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [errorData, setErrorData] = useState("");
  const token = localStorage.getItem(TOKEN_NAME);

  useEffect(() => {
    if (isOpenPopup) {
      const timeoutId = setTimeout(() => {
        setIsOpenPopup(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpenPopup]);

    const onRoleClick = async() => {
      let bodyData;
      if(item.role == "user"){
        bodyData = ADMIN
      }
      else{
        bodyData = "user"
      }
      try {
        const res = await axios.patch(
          `${API_URL}/users/changeRole/${item._id}`,
          {
            role: bodyData,
          },
          {
            headers: {
              "x-api-key": token,
            },
          }
        );
        res.status === 200 &&
          props.fetchUsersData() &&
          alert("sucsses change role user");
      } catch (err) {
        setIsOpenPopup(true);
        console.log(err);
        setErrorData("Error change role of user");
      }
    }

  const handleDelelte = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${API_URL}/users/changeActive/${item._id}`,
        {
          active: !item.active,
        },
        {
          headers: {
            "x-api-key": token,
          },
        }
      );
      res.status === 200 &&
        props.fetchUsersData() &&
        alert("sucsses change active user");
    } catch (err) {
      setIsOpenPopup(true);
      console.log(err);
      setErrorData("Error change active of user");
    }
  };

  return (
    <>
      <Tr>
        <Td>{props.index + 1}</Td>
        <Td>{item.name}</Td>
        <Td>{item.email}</Td>
        <Td>
          <button onClick={onRoleClick}>{item.role}</button>
        </Td>
        <Td>{String(item.active)}</Td>
        <Td>
          <Button onClick={handleDelelte}>X</Button>
        </Td>
      </Tr>
      {isOpenPopup ? (
        <Popup close={() => setIsOpenPopup(false)}>
          <p>{errorData}</p>
        </Popup>
      ) : null}
    </>
  );
}

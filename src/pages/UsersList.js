import React, { useState, useEffect } from 'react'
import { API_URL, TOKEN_NAME } from '../services/apiService';
import axios from 'axios';
import UserItem from './UsersItem';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const H1 = styled.h1`
    color: ${({ theme }) => theme.text};
`;
const Table = styled.table`
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.bgLighter};
    border-collapse: collapse;
    width: 90%;
    /* background: white; */
`;
const Th = styled.th`
border: 1px solid #ddd;
  padding: 8px;
  color: ${({ theme }) => theme.text};
  text-align: left;
  background-color: #bad9e1 ;

`;
const Td = styled.td`
    border: 1px solid #ddd;
  padding: 8px;
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.bgLighter};
  text-align: left;
  background-color: #04AA6D;

`;
const Tr = styled.tr`
    color: ${({ theme }) => theme.text};
    &:nth-child(even){background-color: #f2f2f2;}

    &:hover {background-color: #ddd;}

`;

export default function UsersList() {
    const [ar, setAr] = useState([]);
    const token = localStorage.getItem(TOKEN_NAME);

    useEffect(() => {
        fetchUsersData();
    }, [])

    const fetchUsersData = async () => {
        try {
            const res = await axios.get(
                `${API_URL}/users/usersList`,
                {
                    headers: {
                        "x-api-key": token,
                    },
                }
            );
            setAr(res.data);
        } catch (err) {
            console.log(err);
            alert("there problem ,try again later")
        }

    }


    return (
        <Container>
            <H1>List of users in systems</H1>
            <Table>
                {/* <Table className='table table-striped table-hover'> */}
                <thead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th>Active</Th>
                        <Th>Delete</Th>
                    </Tr>
                </thead>
                <tbody>
                    {ar.map((item, i) => {
                        return (
                            <UserItem key={item._id} fetchUsersData={fetchUsersData} index={i} item={item} />
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}

import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { doApiMethod, API_URL, TOKEN_NAME } from "../services/apiService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
`;
const Form = styled.form`
  text-align: center;
  width: 100%;
`;
const Title = styled.h2`
  font-size: 24px;
  margin: 0px;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  margin: 4px 0px;
`;
const Error = styled.div`
  font-size: 12px;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin: 4px 0px;
  background: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nav = useNavigate();

  const onSubForm = (bodyData) => {
    doApiFormSignUp(bodyData);
  };

  const doApiFormSignUp = async (bodyData) => {
    let url = API_URL + "/auth/signup";
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      nav("/signin");
      alert(resp.data + " You need to login");
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.message.includes("E11000")?"User is already registered in the system":"User or password worng, or service down");
    }
  };

  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  });

  let passwordRef = register("password", { required: true, minLength: 3 });
  let nameRef = register("name", { required: true, minLength: 2 });

  return (
    <Container>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit(onSubForm)}>
        <Input placeholder="Username" {...nameRef} />
        {errors.name && (
          <Error className="text-danger">Enter name nim 2 chars</Error>
        )}
        <Input type="email" placeholder="Email" {...emailRef} />
        {errors.email && (
          <Error className="text-danger">Enter valid email</Error>
        )}
        <Input type="password" placeholder="Password" {...passwordRef} />
        {errors.password && (
          <Error className="text-danger">Enter min 3 charts password</Error>
        )}
        <Button>Sign up</Button>
      </Form>
    </Container>
  );
};

export default SignUp;

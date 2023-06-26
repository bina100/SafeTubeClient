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
import SignUp from "./SignUp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 12px 50px;
  gap: 8px;
  width: 50%;
`;
const Form = styled.form`
  text-align: center;
  width: 100%;
`;
const Title = styled.h2`
  font-size: 24px;
  margin: 0px;
`;
const Error = styled.div`
  font-size: 12px;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  width: 100%;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  background: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubForm = (bodyData) => {
    doApiFormSignIn(bodyData);
  };

  const doApiFormSignIn = async (bodyData) => {
    let url = API_URL + "/auth/signin";
    dispatch(loginStart());

    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      localStorage.setItem(TOKEN_NAME, resp.data.token);
      dispatch(loginSuccess(resp.data.user));
      if(resp.data.user.role === "safeTubeAdmin"){
        navigate("/admin/home");
      }else{
        navigate("/");
      }
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.message);
      dispatch(loginFailure());
    }
  };

  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  });

  let passwordRef = register("password", { required: true, minLength: 3 });

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post(`${API_URL}/auth/google`, {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate(`/`);
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFailure());
      });
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form onSubmit={handleSubmit(onSubForm)}>
          <Input type="email" placeholder="Email" {...emailRef} />
          {errors.email && (
            <Error className="text-danger">Enter valid email</Error>
          )}
          <Input type="password" placeholder="Password" {...passwordRef} />
          {errors.password && (
            <Error className="text-danger">Enter min 3 charts password</Error>
          )}
          <Button>Sign in</Button>
        </Form>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>SignIn with Google</Button>
        <SignUp />
      </Wrapper>
    </Container>
  );
};

export default SignIn;

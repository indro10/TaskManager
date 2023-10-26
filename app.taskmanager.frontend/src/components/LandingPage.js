import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import TasKManager from "./TasKManager";
import TopBar from "./TopBar";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function LandingPage() {
  const authContext = useContext(AuthContext);
  const navigation = useNavigate();
  useEffect(() => {
    console.log(authContext);
    if (authContext.values.accessToken) {
    } else {
      navigation("/");
    }
  }, [authContext.values]);

  return (
    <Container>
      <TopBar />
      <TaskContainer>
        <TasKManager />
      </TaskContainer>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;
const TaskContainer = styled.div`
  flex: 1;
  /* background-color: green; */
`;
const BoardingComponent = styled.div`
  flex: 1;
  background-color: white;
  overflow: hidden;
`;
const Image = styled.img`
  object-fit: contain;
  flex: 1;
  height: 100%;
  width: 100%;
`;

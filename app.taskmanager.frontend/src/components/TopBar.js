import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContextProvider";
import { Button } from "@mui/material";

export default function TopBar() {
  const authContext = useContext(AuthContext);
  return (
    <Container>
      <UserInfo>{`Welcome ${authContext.values.userInfo.name}`}</UserInfo>
      <Heading>Task Manager</Heading>
      <UserIcon>
        <Button
          variant="contained"
          sx={{ backgroundColor: "white", color: "rgb(116, 37, 207)" }}
        >
          Logout{" "}
        </Button>
      </UserIcon>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  /* border: 1px solid purple; */
  background-color: rgb(116, 37, 207);
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
`;
const UserInfo = styled.div`
  display: flex;
  text-align: center;
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
  color: white;
  /* flex: 1; */
`;

const Heading = styled.div`
  display: flex;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: wheat;
  font-size: 32px;
  font-weight: 800;
  @media (max-width: 550px) {
    display: none;
  }
`;
const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  @media (max-width: 550px) {
    flex: 1;
  }
`;

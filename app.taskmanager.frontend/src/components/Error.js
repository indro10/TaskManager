import React from "react";
import styled from "styled-components";
import { Button, CircularProgress } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Error({ message, onClose }) {
  return (
    <Container>
      <ErrorContainer>
        <Header>
          <AiOutlineCloseCircle color="white" size={100} />
        </Header>
        <Content>
          <PrimaryText>Something went wrong!</PrimaryText>
          <SecondaryText>{message}</SecondaryText>
          <ActionContainer>
            <Button
              onClick={() => {
                window.location.reload();
              }}
              variant="contained"
              sx={{ backgroundColor: "rgb(191, 97, 92)", borderRadius: "7px" }}
              startIcon={<AiOutlineCloseCircle />}
            >
              Try Again
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "rgb(191, 97, 92)", borderRadius: "7px" }}
              startIcon={<AiOutlineCloseCircle />}
              onClick={onClose}
            >
              Close
            </Button>
          </ActionContainer>
        </Content>
      </ErrorContainer>
    </Container>
  );
}
const Text = styled.div``;

const Header = styled.div`
  flex: 1;
  background-color: rgb(191, 97, 92);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  padding: 20px;

  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const PrimaryText = styled.div`
  flex: 1;
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: grey;
`;
const SecondaryText = styled.div`
  flex: 1;
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: grey;
`;
const ActionContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100000000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ErrorContainer = styled.div`
  /* color: white; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex: 0.5;
  height: 40%;
  min-width: 350px;
  min-height: 250px;
  border-radius: 10px;
  overflow: hidden;
`;

import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

export default function Loader({ loadingMessage }) {
  return (
    <Container>
      <LoaderContainer>
        <CircularProgress sx={{ color: "white" }} />
        <LoadingText>{loadingMessage}</LoadingText>
      </LoaderContainer>
    </Container>
  );
}
const LoadingText = styled.div``;

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

const LoaderContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

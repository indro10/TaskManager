import React from "react";
import HomeScreen from "./components/TasKManager";
import LoaderProvider from "./context/LoaderContext";
import LoginForm from "./components/LoginForm";
import AuthContextProvider from "./context/AuthContextProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import TasKManager from "./components/TasKManager";
import ErrorContextProvider from "./context/ErrorContextProvider";
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <ErrorContextProvider>
      <AuthContextProvider>
        <LoaderProvider>
          <Router>
            <Routes>
              <Route path="/" Component={LoginForm} />
              <Route path="/signup" Component={SignUp} />
              <Route path="/home" Component={LandingPage} />
            </Routes>
          </Router>
        </LoaderProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  );
}

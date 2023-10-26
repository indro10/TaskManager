import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export default function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [userInfo, setuserInfo] = useState({ name: "" });
  useEffect(() => {
    // console.log(accessToken);
    if (accessToken) {
      axios.interceptors.request.use(
        (config) => {
          // const accessToken = localStorage.getItem("accessToken");
          // if (accessToken) {
          config.headers["authorization"] = `Bearer ${accessToken}`;
          // }

          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  }, [accessToken]);

  const handleAuthValues = (accessToken, refreshToken, userInfo) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userInfo", userInfo);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setuserInfo(userInfo);
  };
  return (
    <AuthContext.Provider
      value={{
        values: { accessToken, refreshToken, userInfo },
        setValues: handleAuthValues,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

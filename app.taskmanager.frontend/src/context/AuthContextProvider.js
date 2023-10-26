import React, { createContext, useState } from "react";

export const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export default function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [userInfo, setuserInfo] = useState({ name: "" });

  const handleAuthValues = (accessToken, refreshToken, userInfo) => {
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

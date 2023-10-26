import React, { createContext, useState } from "react";
import Error from "../components/Error";
export const ErrorContext = createContext();
ErrorContext.displayName = "ErrorContext";

export default function ErrorContextProvider({ children }) {
  const [error, setError] = useState({ display: false, message: "Test" });

  const handleError = (message, display) => {
    setError({ message: message, display: display });
  };
  return (
    <ErrorContext.Provider value={{ setError: handleError }}>
      {error.display === true && (
        <Error
          onClose={() => {
            handleError("", false);
          }}
          message={error.message}
        />
      )}
      {children}
    </ErrorContext.Provider>
  );
}

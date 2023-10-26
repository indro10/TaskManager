import React, { createContext, useState } from "react";
import Loader from "../components/Loader";

export const LoaderContext = createContext();
LoaderContext.displayName = "LoaderContext";

export default function LoaderProvider({ children }) {
  const [loaderConfig, setLoaderConfig] = useState({
    display: false,
    message: "",
  });

  const handleLoader = (message, display) => {
    console.log(display, message);

    setLoaderConfig({ display, message });
  };
  return (
    <LoaderContext.Provider value={{ setLoader: handleLoader }}>
      {loaderConfig.display === true && loaderConfig.message !== "" ? (
        <Loader loadingMessage={loaderConfig.message} />
      ) : null}
      {children}
    </LoaderContext.Provider>
  );
}

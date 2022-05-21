import React, { useState, useContext, createContext } from "react";

export const MetadataContext = createContext();
export const SetMetadataContext = createContext();

export const MetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState({
    resolution: "",
    transform: "none",
    codec: "H264/90000",
    stun: true,
  });

  return (
    <MetadataContext.Provider value={metadata}>
      <SetMetadataContext.Provider value={setMetadata}>
        {children}
      </SetMetadataContext.Provider>
    </MetadataContext.Provider>
  );
};

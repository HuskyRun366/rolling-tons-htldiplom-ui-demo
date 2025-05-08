"use client";

import React from "react";
import { FluentProvider as FProvider, webLightTheme } from "@fluentui/react-components";

interface FluentProviderProps {
  children: React.ReactNode;
}

export const FluentProvider: React.FC<FluentProviderProps> = ({ children }) => {
  return (
    <FProvider theme={webLightTheme}>
      {children}
    </FProvider>
  );
};

export default FluentProvider; 
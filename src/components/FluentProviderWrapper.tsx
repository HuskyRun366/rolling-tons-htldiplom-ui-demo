"use client";

import { ReactNode } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

interface FluentProviderWrapperProps {
  children: ReactNode;
}

export default function FluentProviderWrapper({ children }: FluentProviderWrapperProps) {
  return (
    <FluentProvider theme={webLightTheme}>
      {children}
    </FluentProvider>
  );
} 
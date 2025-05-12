"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import FluentProviderWrapper from "@/components/FluentProviderWrapper";

export default function ClientLayoutWrapper({ 
  children 
}: {
  children: React.ReactNode
}) {
  return (
    <FluentProviderWrapper>
      <div className="flex h-screen">
        <Navbar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </FluentProviderWrapper>
  );
} 
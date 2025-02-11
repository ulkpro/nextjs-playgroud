"use client";

import React from "react";
import { CssBaseline, Container } from "@mui/material";
import { ReduxProvider } from "./providers";
import AppBar from "../components/AppBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body>
          <CssBaseline />
          <AppContent>{children}</AppContent>
        </body>
      </html>
    </ReduxProvider>
  );
}

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function AppContent({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <>
      {isAuthenticated && <AppBar />}
      <Container>{children}</Container>
    </>
  );
}

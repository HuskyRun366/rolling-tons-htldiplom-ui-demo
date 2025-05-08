"use client";

import React from "react";
import { makeStyles, tokens, shorthands } from "@fluentui/react-components";
import Navigation from "./Navigation";
import Header from "./Header";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "260px",
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    flexShrink: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "hidden",
  },
  main: {
    flexGrow: 1,
    padding: tokens.spacingHorizontalL,
    overflowY: "auto",
    backgroundColor: tokens.colorNeutralBackground2,
  }
});

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const styles = useStyles();

  return (
    <span className={styles.root}>
      <span className={styles.sidebar}>
        <Navigation />
      </span>
      <span className={styles.content}>
        <Header />
        <main className={styles.main}>
          {children}
        </main>
      </span>
    </span>
  );
};

export default MainLayout; 
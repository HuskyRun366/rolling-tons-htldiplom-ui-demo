"use client";

import React from "react";
import { 
  Button, 
  Tab, 
  TabList, 
  makeStyles,
  tokens,
  shorthands
} from "@fluentui/react-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    ...shorthands.padding("8px", "16px"),
    display: "flex",
    flexDirection: "column"
  },
  logo: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "24px",
    marginTop: "16px",
    color: tokens.colorBrandForeground1
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
});

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Angebote", path: "/offers" },
  { name: "Kunden", path: "/customers" },
  { name: "Lieferanten", path: "/suppliers" },
  { name: "Kostenkomponenten", path: "/costs" },
  { name: "Bahnhöfe", path: "/stations" },
  { name: "Benutzer", path: "/users" },
  { name: "Einstellungen", path: "/settings" },
];

export const Navigation: React.FC = () => {
  const styles = useStyles();
  const pathname = usePathname();

  return (
    <span className={styles.container}>
      <span className={styles.logo}>
        Rolling-Tons
      </span>
      <TabList vertical appearance="subtle" selectedValue={pathname}>
        {navItems.map((item) => (
          <Link href={item.path} key={item.path} className={styles.link}>
            <Tab 
              value={item.path}
            >
              {item.name}
            </Tab>
          </Link>
        ))}
      </TabList>
    </span>
  );
};

export default Navigation; 
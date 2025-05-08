"use client";

import React from "react";
import {
  makeStyles,
  tokens,
  Avatar,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Text,
  shorthands
} from "@fluentui/react-components";
import { usePathname } from "next/navigation";
import { ChevronDown24Regular, Person24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    height: "60px",
    ...shorthands.padding("0", "24px"),
    width: "100%"
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  username: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  }
});

// Funktion zur Umwandlung der URL in einen Seitentitel
const getPageTitle = (pathname: string): string => {
  if (pathname === "/") return "Dashboard";
  
  // Entferne führenden Slash und erhalte den ersten Pfadteil
  const path = pathname.split("/")[1];
  
  // Umwandlung von Pfad zu Titel
  const titles: Record<string, string> = {
    "offers": "Angebote",
    "customers": "Kunden",
    "suppliers": "Lieferanten",
    "costs": "Kostenkomponenten",
    "stations": "Bahnhöfe",
    "users": "Benutzer",
    "settings": "Einstellungen"
  };
  
  return titles[path] || "Rolling-Tons";
};

export const Header: React.FC = () => {
  const styles = useStyles();
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  
  return (
    <span className={styles.header}>
      <span>
        <Text className={styles.title}>{pageTitle}</Text>
      </span>
      <span className={styles.userSection}>
        <Text className={styles.username}>Max Mustermann</Text>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button 
              icon={<Person24Regular />}
              iconPosition="after"
              appearance="transparent"
            >
              <ChevronDown24Regular />
            </Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Profil</MenuItem>
              <MenuItem>Einstellungen</MenuItem>
              <MenuItem>Abmelden</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </span>
    </span>
  );
};

export default Header; 
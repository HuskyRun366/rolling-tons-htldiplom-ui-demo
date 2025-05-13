"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { 
  Button,
  Text,
  makeStyles
} from "@fluentui/react-components";
import { 
  AppsRegular,
  DocumentRegular,
  PeopleRegular,
  SettingsRegular,
  DatabaseRegular,
  DataBarVerticalRegular,
  PersonRegular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  nav: {
    width: '260px',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    padding: '1rem 0',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky', 
    top: 0,
  },
  navHeader: {
    padding: '0 1rem 1.5rem 1rem',
    borderBottom: '1px solid #e0e0e0',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  navBrand: {
    display: 'flex',
    alignItems: 'baseline',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    color: '#333',
    textDecoration: 'none',
    transition: 'background-color 0.2s',
    
    ':hover': {
      backgroundColor: '#e6e6e6',
    },
  },
  navItemActive: {
    backgroundColor: '#e1edff !important',
    fontWeight: 'bold',
    color: '#005a9e !important',
    
    ':hover': {
      backgroundColor: '#d1e3ff !important',
    },
  },
  navIcon: {
    marginRight: '0.75rem',
    display: 'flex',
    alignItems: 'center',
  },
  activeIcon: {
    color: '#005a9e !important',
  },
  userArea: {
    marginTop: 'auto',
    padding: '1rem',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
  },
  userIcon: {
    marginRight: '1rem',
    backgroundColor: '#0078d4',
    color: 'white',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetailsTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const navLinks = [
  { href: "/", label: "Dashboard", icon: <AppsRegular /> },
  { href: "/angebote", label: "Angebote", icon: <DocumentRegular /> },
  { href: "/kunden", label: "Kunden", icon: <PeopleRegular /> },
  { href: "/stammdaten", label: "Stammdaten", icon: <DatabaseRegular /> },
  { href: "/berichte", label: "Berichte", icon: <DataBarVerticalRegular /> },
  { href: "/einstellungen", label: "Einstellungen", icon: <SettingsRegular /> },
];

export default function Navbar() {
  const styles = useStyles();
  const pathname = usePathname();
  
  return (
    <nav className={styles.nav}>
      <div className={styles.navHeader}>
        <div className={styles.navBrand}>
          <Text size={500} weight="semibold">Rolling-Tons</Text>
        </div>
        <Text size={300}>Angebotssoftware</Text>
      </div>
      
      <ul className={styles.navList}>
        {navLinks.map(link => {
          const isActive =
            link.href === "/"
              ? pathname === link.href
              : pathname.startsWith(link.href);
          
          return (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <span className={`${styles.navIcon} ${isActive ? styles.activeIcon : ''}`}>{link.icon}</span>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      
      <div className={styles.userArea}>
        <div className={styles.userIcon}>
          <PersonRegular />
        </div>
        <div className={styles.userDetailsTextContainer}>
          <Text weight="semibold">Bill Meixner</Text>
          <Text size={200}>Vertriebsmitarbeiter</Text>
        </div>
      </div>
    </nav>
  );
} 
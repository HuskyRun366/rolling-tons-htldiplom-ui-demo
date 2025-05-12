"use client";

import Link from "next/link";
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
    backgroundColor: '#e1edff',
    fontWeight: 'bold',
    
    ':hover': {
      backgroundColor: '#d1e3ff',
    },
  },
  navIcon: {
    marginRight: '0.75rem',
    display: 'flex',
    alignItems: 'center',
  },
  userArea: {
    marginTop: 'auto',
    padding: '1rem',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
  },
  userIcon: {
    marginRight: '0.75rem',
    backgroundColor: '#0078d4',
    color: 'white',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default function Navbar() {
  const styles = useStyles();
  
  return (
    <nav className={styles.nav}>
      <div className={styles.navHeader}>
        <div className={styles.navBrand}>
          <Text size={500} weight="semibold">Rolling-Tons</Text>
        </div>
        <Text size={300}>Angebotssoftware</Text>
      </div>
      
      <ul className={styles.navList}>
        <li>
          <Link href="/" className={`${styles.navItem} ${styles.navItemActive}`}>
            <span className={styles.navIcon}><AppsRegular /></span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/angebote" className={styles.navItem}>
            <span className={styles.navIcon}><DocumentRegular /></span>
            Angebote
          </Link>
        </li>
        <li>
          <Link href="/kunden" className={styles.navItem}>
            <span className={styles.navIcon}><PeopleRegular /></span>
            Kunden
          </Link>
        </li>
        <li>
          <Link href="/stammdaten" className={styles.navItem}>
            <span className={styles.navIcon}><DatabaseRegular /></span>
            Stammdaten
          </Link>
        </li>
        <li>
          <Link href="/berichte" className={styles.navItem}>
            <span className={styles.navIcon}><DataBarVerticalRegular /></span>
            Berichte
          </Link>
        </li>
        <li>
          <Link href="/einstellungen" className={styles.navItem}>
            <span className={styles.navIcon}><SettingsRegular /></span>
            Einstellungen
          </Link>
        </li>
      </ul>
      
      <div className={styles.userArea}>
        <div className={styles.userIcon}>
          <PersonRegular />
        </div>
        <div>
          <Text weight="semibold">Bill Meixner</Text>
          <Text size={200}>Vertriebsmitarbeiter</Text>
        </div>
      </div>
    </nav>
  );
} 
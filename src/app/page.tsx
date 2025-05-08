"use client";

import MainLayout from "@/components/layout/MainLayout";
import {
  Card,
  CardHeader,
  CardFooter,
  Title3,
  Body1,
  Button,
  makeStyles,
  tokens,
  Subtitle2,
  Title2,
  Caption1,
  Label,
  Text,
  Divider,
} from "@fluentui/react-components";
import { 
  DocumentMultiple24Regular, 
  People24Regular, 
  ReceiptMoney24Regular, 
  DocumentAdd24Regular,
  StoreMicrosoft24Regular,
  VehicleTruck24Regular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "20px"
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  statValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    marginTop: "8px",
    marginBottom: "8px"
  },
  iconContainer: {
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "50%",
    padding: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "12px"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  section: {
    marginBottom: "24px"
  },
  recentItemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    gap: "20px",
    marginTop: "16px"
  },
  recentItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    marginBottom: "8px"
  },
  welcome: {
    marginBottom: "32px"
  }
});

export default function Home() {
  const styles = useStyles();

  // Mock-Daten für das Dashboard
  const stats = [
    { 
      title: "Angebote", 
      value: "38", 
      description: "Offene Angebote", 
      icon: <DocumentMultiple24Regular />,
      link: "/offers"
    },
    { 
      title: "Kunden", 
      value: "73", 
      description: "Aktive Kunden", 
      icon: <People24Regular />,
      link: "/customers"
    },
    { 
      title: "Umsatz", 
      value: "€ 547.350", 
      description: "Potenzieller Umsatz (offen)", 
      icon: <ReceiptMoney24Regular />,
      link: "/offers"
    },
    { 
      title: "Lieferanten", 
      value: "12", 
      description: "Aktive Lieferanten", 
      icon: <StoreMicrosoft24Regular />,
      link: "/suppliers"
    },
    { 
      title: "Transportrouten", 
      value: "68", 
      description: "Aktive Routen", 
      icon: <VehicleTruck24Regular />,
      link: "/routes"
    }
  ];

  const recentOffers = [
    { id: "2024-056", customer: "Metallwerk GmbH", date: "15.05.2024", value: "€ 26.450", status: "Offen" },
    { id: "2024-055", customer: "CargoFast AG", date: "12.05.2024", value: "€ 18.980", status: "Offen" },
    { id: "2024-054", customer: "Express Logistics", date: "10.05.2024", value: "€ 34.200", status: "Angenommen" },
    { id: "2024-052", customer: "BSW Transport", date: "08.05.2024", value: "€ 21.400", status: "Offen" }
  ];

  return (
    <MainLayout>
      <span className={styles.welcome}>
        <Title2>Willkommen bei Rolling-Tons</Title2>
        <Body1>Angebotssoftware für Schienengütertransporte</Body1>
      </span>

      <section className={styles.section}>
        <span className={styles.dashboardGrid}>
          {stats.map((stat, index) => (
            <Card key={index} className={styles.card}>
              <CardHeader className={styles.cardHeader}>
                <span>
                  <span className={styles.iconContainer}>
                    {stat.icon}
                  </span>
                  <Subtitle2>{stat.title}</Subtitle2>
                </span>
              </CardHeader>
              <span>
                <span className={styles.statValue}>{stat.value}</span>
                <Caption1>{stat.description}</Caption1>
              </span>
              <CardFooter>
                <Button appearance="transparent" as="a" href={stat.link}>
                  Details anzeigen
                </Button>
              </CardFooter>
            </Card>
          ))}
        </span>
      </section>

      <section className={styles.section}>
        <span className={styles.cardHeader}>
          <Title3>Neueste Angebote</Title3>
          <Button icon={<DocumentAdd24Regular />} appearance="primary">
            Neues Angebot
          </Button>
        </span>
        <span style={{ marginTop: "16px" }}>
          {recentOffers.map((offer, index) => (
            <span key={index} className={styles.recentItem}>
              <span>
                <Text weight="semibold">#{offer.id}</Text>
                <Text>{offer.customer}</Text>
              </span>
              <span>
                <Text>{offer.date}</Text>
              </span>
              <span>
                <Text>{offer.value}</Text>
              </span>
              <span>
                <Label>{offer.status}</Label>
              </span>
              <span>
                <Button appearance="subtle" as="a" href={`/offers/${offer.id}`}>
                  Anzeigen
                </Button>
              </span>
            </span>
          ))}
        </span>
      </section>
    </MainLayout>
  );
}

"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Button,
  Divider,
  Input,
  Title3,
  makeStyles,
  tokens,
  Subtitle2,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Label,
  Text,
  Card,
  CardHeader,
  TabList,
  Tab
} from "@fluentui/react-components";
import {
  DocumentAdd24Regular,
  Search24Regular,
  Filter24Regular,
  ArrowDownload24Regular,
  DocumentCopy24Regular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  searchInput: {
    maxWidth: "400px",
    flexGrow: 1,
  },
  searchFilters: {
    display: "flex",
    gap: "8px",
  },
  cardContainer: {
    marginBottom: "24px",
  },
  statusLabel: {
    borderRadius: "4px",
    padding: "4px 8px",
    fontSize: tokens.fontSizeBase200,
  },
  tableActions: {
    display: "flex",
    gap: "8px",
  },
  statusOpen: {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    color: tokens.colorPaletteYellowForeground1,
  },
  statusAccepted: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1,
  },
  statusRejected: {
    backgroundColor: tokens.colorPaletteRedBackground1,
    color: tokens.colorPaletteRedForeground1,
  },
  inlineContainer: {
    display: "inline-block",
  }
});

export default function OffersPage() {
  const styles = useStyles();

  // Mock-Daten für Angebote
  const offers = [
    { id: "2024-056", customer: "Metallwerk GmbH", date: "15.05.2024", value: "€ 26.450", status: "Offen", route: "Wien - Hamburg" },
    { id: "2024-055", customer: "CargoFast AG", date: "12.05.2024", value: "€ 18.980", status: "Offen", route: "Budapest - München" },
    { id: "2024-054", customer: "Express Logistics", date: "10.05.2024", value: "€ 34.200", status: "Angenommen", route: "Berlin - Wien" },
    { id: "2024-053", customer: "Transalpine GmbH", date: "09.05.2024", value: "€ 42.850", status: "Abgelehnt", route: "Mailand - Wien" },
    { id: "2024-052", customer: "BSW Transport", date: "08.05.2024", value: "€ 21.400", status: "Offen", route: "Wien - Budapest" },
    { id: "2024-051", customer: "Metallwerk GmbH", date: "05.05.2024", value: "€ 31.780", status: "Angenommen", route: "Wien - Hamburg" },
    { id: "2024-050", customer: "CargoXpress", date: "03.05.2024", value: "€ 19.350", status: "Offen", route: "Wien - Zürich" },
    { id: "2024-049", customer: "Logistik Union", date: "02.05.2024", value: "€ 27.600", status: "Angenommen", route: "Wien - Frankfurt" },
    { id: "2024-048", customer: "BahnCargo AG", date: "30.04.2024", value: "€ 32.100", status: "Offen", route: "Berlin - Wien" },
    { id: "2024-047", customer: "TransEurope SA", date: "28.04.2024", value: "€ 18.420", status: "Abgelehnt", route: "Paris - Wien" },
  ];

  // Funktion für die Status-Farbe
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Offen":
        return styles.statusOpen;
      case "Angenommen":
        return styles.statusAccepted;
      case "Abgelehnt":
        return styles.statusRejected;
      default:
        return "";
    }
  };

  return (
    <MainLayout>
      <span className={styles.header}>
        <Title3>Angebotsverwaltung</Title3>
        <Button icon={<DocumentAdd24Regular />} appearance="primary">
          Neues Angebot erstellen
        </Button>
      </span>

      <Card className={styles.cardContainer}>
        <CardHeader>
          <TabList defaultSelectedValue="all">
            <Tab value="all">Alle Angebote</Tab>
            <Tab value="open">Offene Angebote</Tab>
            <Tab value="accepted">Angenommene Angebote</Tab>
            <Tab value="rejected">Abgelehnte Angebote</Tab>
          </TabList>
        </CardHeader>
        <span className={styles.searchContainer}>
          <Input 
            className={styles.searchInput}
            placeholder="Angebote durchsuchen (Kunde, Angebotsnummer, Route...)" 
            contentBefore={<Search24Regular />}
          />
          <span className={styles.searchFilters}>
            <Button icon={<Filter24Regular />} appearance="subtle">
              Filter
            </Button>
            <Button icon={<ArrowDownload24Regular />} appearance="subtle">
              Exportieren
            </Button>
          </span>
        </span>

        <Table aria-label="Angebotsliste">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Angebotsnummer</TableHeaderCell>
              <TableHeaderCell>Kunde</TableHeaderCell>
              <TableHeaderCell>Strecke</TableHeaderCell>
              <TableHeaderCell>Datum</TableHeaderCell>
              <TableHeaderCell>Wert</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Aktionen</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>
                  <Text weight="semibold">#{offer.id}</Text>
                </TableCell>
                <TableCell>{offer.customer}</TableCell>
                <TableCell>{offer.route}</TableCell>
                <TableCell>{offer.date}</TableCell>
                <TableCell>{offer.value}</TableCell>
                <TableCell>
                  <span className={styles.inlineContainer}>
                    <span className={`${styles.statusLabel} ${getStatusStyle(offer.status)}`}>
                      {offer.status}
                    </span>
                  </span>
                </TableCell>
                <TableCell>
                  <span className={styles.tableActions}>
                    <Button icon={<DocumentCopy24Regular />} appearance="subtle" title="Duplizieren" />
                    <Button appearance="subtle" as="a" href={`/offers/${offer.id}`}>
                      Bearbeiten
                    </Button>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </MainLayout>
  );
} 
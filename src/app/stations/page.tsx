"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Button,
  Input,
  Title3,
  makeStyles,
  tokens,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Card,
  CardHeader,
  Badge,
  SelectTabData,
  SelectTabEvent,
  TabList,
  Tab
} from "@fluentui/react-components";
import {
  Search24Regular,
  Filter24Regular,
  Add24Regular,
  Edit24Regular,
  Delete24Regular,
  ArrowDownload24Regular,
  Location24Regular
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
  tableActions: {
    display: "flex",
    gap: "8px",
  },
  badgeContainer: {
    display: "flex",
    gap: "4px",
  },
  locationIcon: {
    color: tokens.colorNeutralForeground2,
    marginRight: "4px",
  },
  inlineContainer: {
    display: "inline-block",
  }
});

export default function StationsPage() {
  const styles = useStyles();
  const [selectedCountry, setSelectedCountry] = React.useState<string | undefined>("all");

  // Mock-Daten für Bahnhöfe
  const stations = [
    { id: "AT001", name: "Wien Hauptbahnhof", code: "ATWIEN", city: "Wien", country: "Österreich", type: "Hauptbahnhof", connections: 12 },
    { id: "AT002", name: "Wien Matzleinsdorf", code: "ATWIM", city: "Wien", country: "Österreich", type: "Güterbahnhof", connections: 6 },
    { id: "AT003", name: "Graz Hauptbahnhof", code: "ATGRAZ", city: "Graz", country: "Österreich", type: "Hauptbahnhof", connections: 8 },
    { id: "AT004", name: "Salzburg Hauptbahnhof", code: "ATSBG", city: "Salzburg", country: "Österreich", type: "Hauptbahnhof", connections: 9 },
    { id: "AT005", name: "Innsbruck Hauptbahnhof", code: "ATIBK", city: "Innsbruck", country: "Österreich", type: "Hauptbahnhof", connections: 7 },
    { id: "DE001", name: "München Hauptbahnhof", code: "DEMUC", city: "München", country: "Deutschland", type: "Hauptbahnhof", connections: 15 },
    { id: "DE002", name: "Berlin Hauptbahnhof", code: "DEBER", city: "Berlin", country: "Deutschland", type: "Hauptbahnhof", connections: 18 },
    { id: "DE003", name: "Hamburg Hauptbahnhof", code: "DEHAM", city: "Hamburg", country: "Deutschland", type: "Hauptbahnhof", connections: 14 },
    { id: "DE004", name: "Frankfurt Hauptbahnhof", code: "DEFRA", city: "Frankfurt", country: "Deutschland", type: "Hauptbahnhof", connections: 16 },
    { id: "DE005", name: "München Ost Rangierbahnhof", code: "DEMOR", city: "München", country: "Deutschland", type: "Güterbahnhof", connections: 10 },
    { id: "HU001", name: "Budapest Keleti", code: "HUBUD", city: "Budapest", country: "Ungarn", type: "Hauptbahnhof", connections: 11 },
    { id: "HU002", name: "Budapest Soroksári út", code: "HUBSO", city: "Budapest", country: "Ungarn", type: "Güterbahnhof", connections: 7 },
    { id: "CH001", name: "Zürich Hauptbahnhof", code: "CHZUR", city: "Zürich", country: "Schweiz", type: "Hauptbahnhof", connections: 12 },
    { id: "CH002", name: "Basel SBB", code: "CHBAS", city: "Basel", country: "Schweiz", type: "Hauptbahnhof", connections: 10 },
    { id: "IT001", name: "Milano Centrale", code: "ITMIL", city: "Mailand", country: "Italien", type: "Hauptbahnhof", connections: 9 },
  ];

  // Filtere Stationen nach ausgewähltem Land
  const filteredStations = selectedCountry === "all" 
    ? stations 
    : stations.filter(station => station.country === selectedCountry);

  // Extrahiere einzigartige Länder für die Tabs
  const uniqueCountries = Array.from(new Set(stations.map(station => station.country)));
  const countries = ["all", ...uniqueCountries];

  // Handle Tab-Auswahl
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedCountry(data.value as string);
  };

  // Farbe für Bahnhofstyp Badge
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Hauptbahnhof":
        return "brand";
      case "Güterbahnhof":
        return "informative";
      default:
        return "subtle";
    }
  };

  return (
    <MainLayout>
      <span className={styles.header}>
        <Title3>Bahnhofsverwaltung</Title3>
        <Button 
          icon={<Add24Regular />} 
          appearance="primary"
        >
          Neuen Bahnhof anlegen
        </Button>
      </span>

      <Card className={styles.cardContainer}>
        <CardHeader>
          <TabList selectedValue={selectedCountry} onTabSelect={onTabSelect}>
            <Tab value="all">Alle Länder</Tab>
            {countries.filter(c => c !== "all").map((country) => (
              <Tab key={country} value={country}>{country}</Tab>
            ))}
          </TabList>
        </CardHeader>
        
        <span className={styles.searchContainer}>
          <Input 
            className={styles.searchInput}
            placeholder="Bahnhöfe durchsuchen (Name, Code, Stadt...)" 
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

        <Table aria-label="Bahnhofsliste">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Bahnhof</TableHeaderCell>
              <TableHeaderCell>Code</TableHeaderCell>
              <TableHeaderCell>Stadt</TableHeaderCell>
              <TableHeaderCell>Land</TableHeaderCell>
              <TableHeaderCell>Typ</TableHeaderCell>
              <TableHeaderCell>Verbindungen</TableHeaderCell>
              <TableHeaderCell>Aktionen</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStations.map((station) => (
              <TableRow key={station.id}>
                <TableCell>
                  <Text weight="semibold">{station.name}</Text>
                </TableCell>
                <TableCell>{station.code}</TableCell>
                <TableCell>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <Location24Regular className={styles.locationIcon} fontSize={16} />
                    <Text>{station.city}</Text>
                  </span>
                </TableCell>
                <TableCell>{station.country}</TableCell>
                <TableCell>
                  <span className={styles.inlineContainer}>
                    <Badge appearance="tint" color={getBadgeColor(station.type)}>
                      {station.type}
                    </Badge>
                  </span>
                </TableCell>
                <TableCell>{station.connections}</TableCell>
                <TableCell>
                  <span className={styles.tableActions}>
                    <Button icon={<Edit24Regular />} appearance="subtle" title="Bearbeiten" />
                    <Button icon={<Delete24Regular />} appearance="subtle" title="Löschen" />
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
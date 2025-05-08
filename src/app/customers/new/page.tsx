"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Button,
  Input,
  Title3,
  makeStyles,
  tokens,
  Text,
  Card,
  CardHeader,
  CardFooter,
  Field,
  Dropdown,
  Option,
  Textarea,
  Divider,
  Subtitle2,
  Body1,
  Checkbox,
  TabList,
  Tab,
  SelectTabEventHandler,
  SelectTabData,
  TabValue
} from "@fluentui/react-components";
import {
  ArrowLeft24Regular,
  Mail24Regular,
  Phone24Regular,
  Building24Regular,
  PersonAdd24Regular,
  Location24Regular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  backButton: {
    marginRight: "16px",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  section: {
    marginBottom: "24px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "24px",
    rowGap: "16px",
    marginTop: "16px",
  },
  formGridWide: {
    gridColumn: "span 2",
  },
  buttonContainer: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },
  tabContent: {
    padding: "16px 0",
  }
});

export default function NewCustomerPage() {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState<TabValue>("general");

  const onTabSelect: SelectTabEventHandler = (event, data) => {
    setSelectedTab(data.value);
  };

  return (
    <MainLayout>
      <span className={styles.header}>
        <span className={styles.headerContainer}>
          <Button
            appearance="subtle"
            icon={<ArrowLeft24Regular />}
            className={styles.backButton}
            as="a"
            href="/customers"
          >
            Zurück
          </Button>
          <Title3>Neuen Kunden anlegen</Title3>
        </span>
        <span className={styles.buttonContainer}>
          <Button appearance="outline">Abbrechen</Button>
          <Button appearance="primary">Speichern</Button>
        </span>
      </span>

      <Card>
        <CardHeader>
          <TabList selectedValue={selectedTab} onTabSelect={onTabSelect}>
            <Tab value="general">Allgemeine Informationen</Tab>
            <Tab value="contacts">Kontaktpersonen</Tab>
            <Tab value="offers">Angebote</Tab>
          </TabList>
        </CardHeader>
        
        {selectedTab === "general" && (
          <span className={styles.tabContent}>
            <span className={styles.section}>
              <Subtitle2>Stammdaten</Subtitle2>
              <span className={styles.formGrid}>
                <Field label="Kundennummer" required>
                  <Input placeholder="Wird automatisch generiert" value="C010" readOnly />
                </Field>
                <Field label="Kundentyp" required>
                  <Dropdown placeholder="Kundentyp auswählen">
                    <Option>Industrie</Option>
                    <Option>Logistik</Option>
                    <Option>Transport</Option>
                    <Option>Handelsunternehmen</Option>
                  </Dropdown>
                </Field>
                <Field label="Firmenname" required className={styles.formGridWide}>
                  <Input placeholder="Firmenname des Kunden" />
                </Field>
                <Field label="Branche">
                  <Dropdown placeholder="Branche auswählen">
                    <Option>Automobilindustrie</Option>
                    <Option>Baustoffindustrie</Option>
                    <Option>Chemieindustrie</Option>
                    <Option>Lebensmittelindustrie</Option>
                    <Option>Logistikdienstleister</Option>
                    <Option>Stahlindustrie</Option>
                  </Dropdown>
                </Field>
                <Field label="Umsatzsteuer-ID">
                  <Input placeholder="Umsatzsteuer-ID eingeben" />
                </Field>
              </span>
            </span>

            <Divider />

            <span className={styles.section}>
              <Subtitle2>Adresse & Kontakt</Subtitle2>
              <span className={styles.formGrid}>
                <Field label="Straße & Hausnummer" required className={styles.formGridWide}>
                  <Input placeholder="Straße und Hausnummer" contentBefore={<Location24Regular />} />
                </Field>
                <Field label="PLZ" required>
                  <Input placeholder="Postleitzahl" />
                </Field>
                <Field label="Ort" required>
                  <Input placeholder="Ort" />
                </Field>
                <Field label="Land" required>
                  <Dropdown placeholder="Land auswählen">
                    <Option>Österreich</Option>
                    <Option>Deutschland</Option>
                    <Option>Schweiz</Option>
                    <Option>Italien</Option>
                    <Option>Ungarn</Option>
                    <Option>Tschechien</Option>
                  </Dropdown>
                </Field>
                <Field label="Telefon" required>
                  <Input placeholder="Telefonnummer" contentBefore={<Phone24Regular />} />
                </Field>
                <Field label="E-Mail" required>
                  <Input placeholder="E-Mail-Adresse" contentBefore={<Mail24Regular />} type="email" />
                </Field>
                <Field label="Website">
                  <Input placeholder="Website (optional)" contentBefore="https://" />
                </Field>
              </span>
            </span>

            <Divider />

            <span className={styles.section}>
              <Subtitle2>Hauptansprechpartner</Subtitle2>
              <span className={styles.formGrid}>
                <Field label="Anrede">
                  <Dropdown placeholder="Anrede auswählen">
                    <Option>Herr</Option>
                    <Option>Frau</Option>
                    <Option>Divers</Option>
                  </Dropdown>
                </Field>
                <Field label="Titel">
                  <Input placeholder="Akademischer Titel (optional)" />
                </Field>
                <Field label="Vorname" required>
                  <Input placeholder="Vorname" />
                </Field>
                <Field label="Nachname" required>
                  <Input placeholder="Nachname" />
                </Field>
                <Field label="Position">
                  <Input placeholder="Position im Unternehmen" contentBefore={<Building24Regular />} />
                </Field>
                <Field label="Abteilung">
                  <Input placeholder="Abteilung" />
                </Field>
                <Field label="Telefon (direkt)">
                  <Input placeholder="Direkte Telefonnummer" contentBefore={<Phone24Regular />} />
                </Field>
                <Field label="E-Mail" required>
                  <Input placeholder="E-Mail-Adresse" contentBefore={<Mail24Regular />} type="email" />
                </Field>
              </span>
            </span>

            <Divider />

            <span className={styles.section}>
              <Subtitle2>Zusätzliche Informationen</Subtitle2>
              <span className={styles.formGrid}>
                <Field label="Notizen" className={styles.formGridWide}>
                  <Textarea
                    placeholder="Interne Notizen zu diesem Kunden"
                    rows={4}
                  />
                </Field>
                <span className={styles.formGridWide}>
                  <Checkbox label="Kunde erhält Newsletter" />
                  <Checkbox label="Kunde ist aktiv" defaultChecked />
                </span>
              </span>
            </span>
          </span>
        )}

        {selectedTab === "contacts" && (
          <span className={styles.tabContent}>
            <span className={styles.section}>
              <Subtitle2>Kontaktpersonen</Subtitle2>
              <Body1>Hier können Sie weitere Kontaktpersonen für diesen Kunden hinzufügen.</Body1>
              <span style={{ marginTop: "16px" }}>
                <Button appearance="primary" icon={<PersonAdd24Regular />}>
                  Neue Kontaktperson hinzufügen
                </Button>
              </span>
              <span style={{ marginTop: "24px", textAlign: "center" }}>
                <Text>Noch keine Kontaktpersonen hinzugefügt.</Text>
              </span>
            </span>
          </span>
        )}

        {selectedTab === "offers" && (
          <span className={styles.tabContent}>
            <span className={styles.section}>
              <Subtitle2>Angebote</Subtitle2>
              <Body1>Hier werden alle Angebote für diesen Kunden angezeigt.</Body1>
              <span style={{ marginTop: "24px", textAlign: "center" }}>
                <Text>Für diesen Kunden wurden noch keine Angebote erstellt.</Text>
              </span>
            </span>
          </span>
        )}

        <CardFooter>
          <span className={styles.buttonContainer}>
            <Button appearance="secondary" as="a" href="/customers">Abbrechen</Button>
            <Button appearance="primary">Kunden anlegen</Button>
          </span>
        </CardFooter>
      </Card>
    </MainLayout>
  );
} 
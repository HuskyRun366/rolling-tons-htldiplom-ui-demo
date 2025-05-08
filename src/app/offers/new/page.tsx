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
  Label,
  SpinButton,
  Subtitle2,
  Body1,
  Checkbox,
  RadioGroup,
  Radio,
  TabList,
  Tab,
  SelectTabEventHandler,
  SelectTabData,
  TabValue
} from "@fluentui/react-components";
import {
  Add24Regular,
  ArrowLeft24Regular,
  CalendarLtr24Regular,
  Delete24Regular,
  DocumentPdf24Regular
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
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "16px",
  },
  tableHeader: {
    backgroundColor: tokens.colorNeutralBackground3,
    textAlign: "left" as const,
    padding: "8px",
    fontWeight: tokens.fontWeightSemibold,
  },
  tableCell: {
    padding: "8px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  priceContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: tokens.borderRadiusMedium,
  },
  buttonContainer: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },
  actionIconContainer: {
    display: "flex",
    gap: "8px",
  },
  costContainer: {
    marginTop: "16px",
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  tabContent: {
    padding: "16px 0",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  }
});

export default function NewOfferPage() {
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
            href="/offers"
          >
            Zurück
          </Button>
          <Title3>Neues Angebot erstellen</Title3>
        </span>
        <span className={styles.buttonContainer}>
          <Button appearance="outline">Speichern</Button>
          <Button appearance="primary">Als PDF exportieren</Button>
        </span>
      </span>

      <Card>
        <CardHeader>
          <TabList selectedValue={selectedTab} onTabSelect={onTabSelect}>
            <Tab value="general">Allgemeine Informationen</Tab>
            <Tab value="route">Route & Transport</Tab>
            <Tab value="pricing">Preiskalkulation</Tab>
            <Tab value="documents">Dokumente</Tab>
          </TabList>
        </CardHeader>
        
        {selectedTab === "general" && (
          <span className={styles.tabContent}>
            <span className={styles.section}>
              <Subtitle2>Angebotsdaten</Subtitle2>
              <span className={styles.formGrid}>
                <Field label="Angebotsnummer" required>
                  <Input placeholder="Wird automatisch generiert" value="2024-057" readOnly />
                </Field>
                <Field label="Angebotsdatum" required>
                  <Input type="date" contentBefore={<CalendarLtr24Regular />} />
                </Field>
                <Field label="Gültig bis" required>
                  <Input type="date" contentBefore={<CalendarLtr24Regular />} />
                </Field>
                <Field label="Bearbeiter">
                  <Input value="Max Mustermann" readOnly />
                </Field>
              </span>
            </span>

            <Divider />

            <span className={styles.section}>
              <Subtitle2>Kundendaten</Subtitle2>
              <span className={styles.formGrid}>
                <Field label="Kunde auswählen" required className={styles.formGridWide}>
                  <Dropdown placeholder="Kunde suchen oder auswählen">
                    <Option>Metallwerk GmbH</Option>
                    <Option>CargoFast AG</Option>
                    <Option>Express Logistics</Option>
                    <Option>Transalpine GmbH</Option>
                    <Option>BSW Transport</Option>
                    <Option>CargoXpress</Option>
                    <Option>Logistik Union</Option>
                    <Option>BahnCargo AG</Option>
                    <Option>TransEurope SA</Option>
                  </Dropdown>
                </Field>
                <Field label="Firmenname" required>
                  <Input placeholder="Firmenname" />
                </Field>
                <Field label="Kundennummer">
                  <Input placeholder="Kundennummer" />
                </Field>
                <Field label="Ansprechpartner" required>
                  <Input placeholder="Ansprechpartner" />
                </Field>
                <Field label="E-Mail" required>
                  <Input placeholder="E-Mail" type="email" />
                </Field>
                <Field label="Telefon">
                  <Input placeholder="Telefon" />
                </Field>
                <Field label="Adresse" required className={styles.formGridWide}>
                  <Input placeholder="Straße, Hausnummer" />
                </Field>
                <Field label="PLZ" required>
                  <Input placeholder="PLZ" />
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
              </span>
            </span>

            <Divider />

            <span className={styles.section}>
              <Subtitle2>Angebotsbeschreibung</Subtitle2>
              <span className={styles.formGrid}>
                <Field label="Angebotstitel" required className={styles.formGridWide}>
                  <Input placeholder="Kurze Bezeichnung des Angebots" />
                </Field>
                <Field label="Beschreibung" className={styles.formGridWide}>
                  <Textarea
                    placeholder="Detaillierte Beschreibung des Angebots"
                    rows={4}
                  />
                </Field>
              </span>
            </span>
          </span>
        )}

        {selectedTab === "route" && (
          <span className={styles.tabContent}>
            <span className={styles.section}>
              <Subtitle2>Transportroute</Subtitle2>
              <span className={styles.formGrid}>
                <Field label="Start" required>
                  <Dropdown placeholder="Startbahnhof auswählen">
                    <Option>Wien Hauptbahnhof (AT)</Option>
                    <Option>Wien Matzleinsdorf (AT)</Option>
                    <Option>Budapest (HU)</Option>
                    <Option>Berlin (DE)</Option>
                    <Option>Hamburg (DE)</Option>
                    <Option>München (DE)</Option>
                    <Option>Zürich (CH)</Option>
                  </Dropdown>
                </Field>
                <Field label="Ziel" required>
                  <Dropdown placeholder="Zielbahnhof auswählen">
                    <Option>Wien Hauptbahnhof (AT)</Option>
                    <Option>Wien Matzleinsdorf (AT)</Option>
                    <Option>Budapest (HU)</Option>
                    <Option>Berlin (DE)</Option>
                    <Option>Hamburg (DE)</Option>
                    <Option>München (DE)</Option>
                    <Option>Zürich (CH)</Option>
                  </Dropdown>
                </Field>
                <Field label="Via (optional)" className={styles.formGridWide}>
                  <Input placeholder="Zwischenstationen (optional)" />
                </Field>
                <Field label="Transportart" required>
                  <RadioGroup layout="horizontal">
                    <Radio value="single" label="Einzeltransport" />
                    <Radio value="regular" label="Regelmäßig" />
                  </RadioGroup>
                </Field>
                <Field label="Fahrten pro Woche" className={styles.formGridWide}>
                  <SpinButton min={1} max={7} defaultValue={1} />
                </Field>
              </span>
            </span>

            <Divider />

            <span className={styles.section}>
              <Subtitle2>Transportdetails</Subtitle2>
              <span className={styles.formGrid}>
                <Field label="Güterart" required>
                  <Dropdown placeholder="Güterart auswählen">
                    <Option>Schüttgut</Option>
                    <Option>Container</Option>
                    <Option>Flüssigkeiten</Option>
                    <Option>Gefahrgut</Option>
                    <Option>Schwerlasten</Option>
                    <Option>Stückgut</Option>
                  </Dropdown>
                </Field>
                <Field label="Gewicht (t)" required>
                  <SpinButton min={1} max={2000} defaultValue={100} />
                </Field>
                <Field label="Waggontyp" required>
                  <Dropdown placeholder="Waggontyp auswählen">
                    <Option>Containertragwagen</Option>
                    <Option>Flachwagen</Option>
                    <Option>Kesselwagen</Option>
                    <Option>Schiebewandwagen</Option>
                    <Option>Selbstentladewagen</Option>
                  </Dropdown>
                </Field>
                <Field label="Anzahl Waggons" required>
                  <SpinButton min={1} max={30} defaultValue={10} />
                </Field>
                <Field label="Lokomotivtyp" required>
                  <Dropdown placeholder="Lokomotivtyp auswählen">
                    <Option>Siemens Vectron</Option>
                    <Option>Bombardier TRAXX</Option>
                    <Option>Siemens ES64</Option>
                    <Option>Alstom Prima II</Option>
                  </Dropdown>
                </Field>
                <Field label="Zusatzservices">
                  <span className={styles.checkboxContainer}>
                    <Checkbox label="Rangierservice" />
                    <Checkbox label="24h-Support" />
                    <Checkbox label="Echtzeit-Tracking" />
                  </span>
                </Field>
              </span>
            </span>
          </span>
        )}

        {selectedTab === "pricing" && (
          <span className={styles.tabContent}>
            <span className={styles.section}>
              <Subtitle2>Kostenkomponenten</Subtitle2>
              <Body1>Fügen Sie die Kostenkomponenten für die Kalkulation hinzu.</Body1>

              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Komponente</th>
                    <th className={styles.tableHeader}>Beschreibung</th>
                    <th className={styles.tableHeader}>Einzelpreis (€)</th>
                    <th className={styles.tableHeader}>Anzahl</th>
                    <th className={styles.tableHeader}>Gesamtpreis (€)</th>
                    <th className={styles.tableHeader}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tableCell}>Trassengebühr AT</td>
                    <td className={styles.tableCell}>Wien - Grenzübergang</td>
                    <td className={styles.tableCell}>2.450,00</td>
                    <td className={styles.tableCell}>1</td>
                    <td className={styles.tableCell}>2.450,00</td>
                    <td className={styles.tableCell}>
                      <Button icon={<Delete24Regular />} appearance="subtle" />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tableCell}>Trassengebühr DE</td>
                    <td className={styles.tableCell}>Grenzübergang - Hamburg</td>
                    <td className={styles.tableCell}>4.850,00</td>
                    <td className={styles.tableCell}>1</td>
                    <td className={styles.tableCell}>4.850,00</td>
                    <td className={styles.tableCell}>
                      <Button icon={<Delete24Regular />} appearance="subtle" />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tableCell}>Lokomotivkosten</td>
                    <td className={styles.tableCell}>Siemens Vectron</td>
                    <td className={styles.tableCell}>3.850,00</td>
                    <td className={styles.tableCell}>1</td>
                    <td className={styles.tableCell}>3.850,00</td>
                    <td className={styles.tableCell}>
                      <Button icon={<Delete24Regular />} appearance="subtle" />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tableCell}>Personalkosten</td>
                    <td className={styles.tableCell}>Lokführer</td>
                    <td className={styles.tableCell}>1.200,00</td>
                    <td className={styles.tableCell}>2</td>
                    <td className={styles.tableCell}>2.400,00</td>
                    <td className={styles.tableCell}>
                      <Button icon={<Delete24Regular />} appearance="subtle" />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tableCell}>Energiekosten</td>
                    <td className={styles.tableCell}>Diesel/Strom</td>
                    <td className={styles.tableCell}>3.200,00</td>
                    <td className={styles.tableCell}>1</td>
                    <td className={styles.tableCell}>3.200,00</td>
                    <td className={styles.tableCell}>
                      <Button icon={<Delete24Regular />} appearance="subtle" />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tableCell}>Waggonmiete</td>
                    <td className={styles.tableCell}>Containertragwagen</td>
                    <td className={styles.tableCell}>450,00</td>
                    <td className={styles.tableCell}>10</td>
                    <td className={styles.tableCell}>4.500,00</td>
                    <td className={styles.tableCell}>
                      <Button icon={<Delete24Regular />} appearance="subtle" />
                    </td>
                  </tr>
                </tbody>
              </table>

              <Button
                icon={<Add24Regular />}
                appearance="outline"
                style={{ marginTop: "16px" }}
              >
                Kostenkomponente hinzufügen
              </Button>

              <span className={styles.costContainer}>
                <span style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>     
                  <Text>Summe Einkaufskosten:</Text>
                  <Text weight="semibold">21.250,00 €</Text>
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>     
                  <Text>Marge (15%):</Text>
                  <Text weight="semibold">3.187,50 €</Text>
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>     
                  <Text>Zwischensumme:</Text>
                  <Text weight="semibold">24.437,50 €</Text>
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>     
                  <Text>Rabatt (5%):</Text>
                  <Text weight="semibold">-1.221,88 €</Text>
                </span>
                <Divider style={{ margin: "8px 0" }} />
                <span style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text weight="semibold">Angebotssumme (netto):</Text>
                  <Text style={{ fontSize: tokens.fontSizeBase600, fontWeight: tokens.fontWeightSemibold }}>
                    23.215,62 €
                  </Text>
                </span>
              </span>
            </span>
          </span>
        )}

        {selectedTab === "documents" && (
          <span className={styles.tabContent}>
            <span className={styles.section}>
              <Subtitle2>Angebotsdokument</Subtitle2>
              <Body1>
                Nach dem Speichern können Sie hier das Angebotsdokument generieren und herunterladen.      
              </Body1>
              <span style={{ marginTop: "16px" }}>
                <Button
                  icon={<DocumentPdf24Regular />}
                  appearance="primary"
                  disabled
                >
                  PDF generieren
                </Button>
              </span>
            </span>

            <Divider />

            <span className={styles.section}>
              <Subtitle2>Zusätzliche Dokumente</Subtitle2>
              <Body1>
                Hier können Sie zusätzliche Dokumente hochladen, die mit dem Angebot verknüpft werden sollen.
              </Body1>
              <span style={{ marginTop: "16px" }}>
                <Button appearance="outline">Dokument hochladen</Button>
              </span>
            </span>
          </span>
        )}

        <CardFooter>
          <span className={styles.buttonContainer}>
            <Button appearance="secondary">Abbrechen</Button>
            <Button appearance="outline">Als Entwurf speichern</Button>
            <Button appearance="primary">Angebot erstellen</Button>
          </span>
        </CardFooter>
      </Card>
    </MainLayout>
  );
} 
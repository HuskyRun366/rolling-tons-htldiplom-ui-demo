"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Title2,
  Label,
  Input,
  Textarea,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Field,
  FluentProvider,
  webLightTheme,
  Spinner
} from "@fluentui/react-components";
import { Save24Regular, Dismiss24Regular } from "@fluentui/react-icons";
import { useKunden } from "@/contexts/KundenContext";
import type { Kunde } from "@/contexts/KundenContext";

export default function BearbeiteKundePage() {
  const router = useRouter();
  const params = useParams();
  const { getKundeById, updateKunde } = useKunden();

  const kundeId = typeof params.id === "string" ? params.id : "";

  const [kundeName, setKundeName] = useState("");
  const [ansprechpartnerText, setAnsprechpartnerText] = useState("");
  const [originalKunde, setOriginalKunde] = useState<Kunde | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (kundeId) {
      const foundKunde = getKundeById(kundeId);
      setOriginalKunde(foundKunde);
      if (foundKunde) {
        setKundeName(foundKunde.name);
        setAnsprechpartnerText(foundKunde.ansprechpartner.join(", "));
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setOriginalKunde(null);
    }
  }, [kundeId, getKundeById]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kundeName.trim()) {
      alert("Kundenname ist erforderlich.");
      return;
    }
    const ansprechpartnerArray = ansprechpartnerText
      .split(",")
      .map((ap) => ap.trim())
      .filter((ap) => ap !== "");

    updateKunde(kundeId, {
      name: kundeName,
      ansprechpartner: ansprechpartnerArray,
    });
    router.push(`/kunden/${kundeId}`); // Navigate to details page after update
  };

  if (isLoading) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div className="p-6 flex justify-center items-center h-screen">
          <Spinner labelPosition="below" label="Lade Kundendaten zum Bearbeiten..." />
        </div>
      </FluentProvider>
    );
  }

  if (!originalKunde) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div className="p-6">
          <Title2 as="h2">Kunde nicht gefunden</Title2>
          <p className="mt-2">Der zu bearbeitende Kunde konnte nicht gefunden werden.</p>
          <Link href="/kunden" passHref legacyBehavior>
            <Button appearance="primary" className="mt-4" as="a">
              Zurück zur Kundenliste
            </Button>
          </Link>
        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="p-6">
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <Link href="/kunden">Kunden</Link>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <Link href={`/kunden/${originalKunde.id}`}>{originalKunde.name}</Link>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>Bearbeiten</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <Title2 as="h2" className="mb-6">
          Kunde bearbeiten: {originalKunde.name}
        </Title2>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          <Field label="Kundenname" required>
            <Input
              type="text"
              value={kundeName}
              onChange={(e, data) => setKundeName(data.value)}
              placeholder="Name des Kunden"
              className="w-full"
            />
          </Field>

          <Field
            label="Ansprechpartner (kommasepariert)"
            hint="Mehrere Ansprechpartner mit Komma trennen"
          >
            <Textarea
              value={ansprechpartnerText}
              onChange={(e, data) => setAnsprechpartnerText(data.value)}
              placeholder="z.B. Max Mustermann, Erika Musterfrau"
              className="w-full"
              rows={3}
            />
          </Field>

          <div className="flex justify-end gap-2 pt-4">
            <Link href={`/kunden/${originalKunde.id}`} passHref legacyBehavior>
              <Button icon={<Dismiss24Regular />} appearance="secondary" as="a">
                Abbrechen
              </Button>
            </Link>
            <Button
              icon={<Save24Regular />}
              appearance="primary"
              type="submit"
            >
              Änderungen speichern
            </Button>
          </div>
        </form>
      </div>
    </FluentProvider>
  );
} 
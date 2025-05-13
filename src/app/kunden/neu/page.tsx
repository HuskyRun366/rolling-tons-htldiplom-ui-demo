"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "@fluentui/react-components";
import { Save24Regular, Dismiss24Regular } from "@fluentui/react-icons";
import { useKunden } from "@/contexts/KundenContext";

export default function NeuerKundePage() {
  const router = useRouter();
  const { addKunde } = useKunden();
  const [kundeName, setKundeName] = useState("");
  const [ansprechpartnerText, setAnsprechpartnerText] = useState(""); // Comma-separated string

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kundeName.trim()) {
      // Basic validation: name is required
      alert("Kundenname ist erforderlich.");
      return;
    }
    const ansprechpartnerArray = ansprechpartnerText
      .split(",")
      .map((ap) => ap.trim())
      .filter((ap) => ap !== "");

    addKunde({
      name: kundeName,
      ansprechpartner: ansprechpartnerArray,
    });
    router.push("/kunden");
  };

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
            <BreadcrumbItem>Neuer Kunde</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <Title2 as="h2" className="mb-6">
          Neuen Kunden anlegen
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
            hint="Mehrere Ansprechpartner mit Komma trennen (z.B. Max Mustermann, Erika Musterfrau)"
          >
            <Textarea
              value={ansprechpartnerText}
              onChange={(e, data) => setAnsprechpartnerText(data.value)}
              placeholder="z.B. Max Mustermann, Erika Musterfrau"
              className="w-full"
              rows={3}
            />
          </Field>

          {/* Weitere Felder können hier hinzugefügt werden, z.B. Adresse, Kontaktdaten */}

          <div className="flex justify-end gap-2 pt-4">
            <Link href="/kunden" passHref legacyBehavior>
              <Button icon={<Dismiss24Regular />} appearance="secondary" as="a">
                Abbrechen
              </Button>
            </Link>
            <Button
              icon={<Save24Regular />}
              appearance="primary"
              type="submit"
            >
              Kunde speichern
            </Button>
          </div>
        </form>
      </div>
    </FluentProvider>
  );
} 
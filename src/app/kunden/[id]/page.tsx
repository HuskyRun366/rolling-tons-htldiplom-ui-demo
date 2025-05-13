"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Title2,
  Text as FluentText,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Card,
  CardHeader,
  CardPreview, // Assuming CardPreview might be useful for a structured layout
  Label,
  FluentProvider,
  webLightTheme,
  Spinner // For loading state
} from "@fluentui/react-components";
import { EditRegular } from "@fluentui/react-icons";
import { useKunden } from "@/contexts/KundenContext";
import type { Kunde } from "@/contexts/KundenContext";
import { useEffect, useState } from "react";

export default function KundeDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { getKundeById } = useKunden();
  const [kunde, setKunde] = useState<Kunde | null | undefined>(undefined); // undefined for loading, null if not found

  const kundeId = typeof params.id === "string" ? params.id : "";

  useEffect(() => {
    if (kundeId) {
      const foundKunde = getKundeById(kundeId);
      setKunde(foundKunde);
    } else {
      setKunde(null); // No ID, so not found
    }
  }, [kundeId, getKundeById]);

  if (kunde === undefined) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div className="p-6 flex justify-center items-center h-screen">
          <Spinner labelPosition="below" label="Lade Kundendetails..." />
        </div>
      </FluentProvider>
    );
  }

  if (!kunde) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div className="p-6">
          <Title2 as="h2">Kunde nicht gefunden</Title2>
          <FluentText className="block mt-2">
            Der gesuchte Kunde konnte nicht gefunden werden.
          </FluentText>
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
            <BreadcrumbItem>{kunde.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Title2 as="h2">{kunde.name}</Title2>
          <Link href={`/kunden/${kunde.id}/bearbeiten`} passHref legacyBehavior>
            <Button icon={<EditRegular />} appearance="primary" as="a">
              Bearbeiten
            </Button>
          </Link>
        </div>

        <Card className="max-w-lg">
          <CardHeader
            header={<FluentText weight="semibold">Kundendetails</FluentText>}
          />
          <div className="p-4 space-y-3">
            <div>
              <Label weight="semibold">ID:</Label>
              <FluentText block>{kunde.id}</FluentText>
            </div>
            <div>
              <Label weight="semibold">Name:</Label>
              <FluentText block>{kunde.name}</FluentText>
            </div>
            <div>
              <Label weight="semibold">Ansprechpartner:</Label>
              {kunde.ansprechpartner.length > 0 ? (
                <ul className="list-disc list-inside">
                  {kunde.ansprechpartner.map((ap, index) => (
                    <li key={index}>
                      <FluentText>{ap}</FluentText>
                    </li>
                  ))}
                </ul>
              ) : (
                <FluentText block>Keine Ansprechpartner erfasst.</FluentText>
              )}
            </div>
            {/* Weitere Details hier anzeigen */}
          </div>
        </Card>
      </div>
    </FluentProvider>
  );
} 
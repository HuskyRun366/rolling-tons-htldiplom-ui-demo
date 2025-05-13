"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Title2,
  Card,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Text as FluentText,
} from "@fluentui/react-components";
import {
  PersonAdd24Regular,
  DocumentSearch24Regular,
  EditRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import { useKunden } from "@/contexts/KundenContext";
import type { Kunde } from "@/contexts/KundenContext";

export default function KundenPage() {
  const { kunden, deleteKunde } = useKunden();
  const router = useRouter();
  const [kundeToDelete, setKundeToDelete] = useState<Kunde | null>(null);

  const handleDeleteConfirm = () => {
    if (kundeToDelete) {
      deleteKunde(kundeToDelete.id);
      setKundeToDelete(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Kunden</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Title2>Kunden</Title2>
        <Link href="/kunden/neu">
          <Button appearance="primary" icon={<PersonAdd24Regular />}>
            Neuer Kunde
          </Button>
        </Link>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Ansprechpartner</TableHeaderCell>
              <TableHeaderCell>Aktionen</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kunden.length > 0 ? (
              kunden.map((kunde) => (
                <TableRow key={kunde.id}>
                  <TableCell>{kunde.name}</TableCell>
                  <TableCell>{kunde.ansprechpartner.join(", ")}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Link href={`/kunden/${kunde.id}`} passHref legacyBehavior>
                      <Button
                        icon={<DocumentSearch24Regular />}
                        size="small"
                        as="a"
                      >
                        Details
                      </Button>
                    </Link>
                    <Link href={`/kunden/${kunde.id}/bearbeiten`} passHref legacyBehavior>
                      <Button icon={<EditRegular />} size="small" as="a">
                        Bearbeiten
                      </Button>
                    </Link>
                    <Dialog
                      open={!!kundeToDelete && kundeToDelete.id === kunde.id}
                      onOpenChange={(_, data) => {
                        if (!data.open) setKundeToDelete(null);
                      }}
                    >
                      <DialogTrigger disableButtonEnhancement>
                        <Button
                          icon={<DeleteRegular />}
                          size="small"
                          appearance="subtle"
                          onClick={() => setKundeToDelete(kunde)}
                        >
                          Löschen
                        </Button>
                      </DialogTrigger>
                      <DialogSurface>
                        <DialogBody>
                          <DialogTitle>Kunde löschen</DialogTitle>
                          <DialogContent>
                            <FluentText>
                              Sind Sie sicher, dass Sie den Kunden \\"{kundeToDelete?.name}\\" unwiderruflich löschen möchten?
                            </FluentText>
                          </DialogContent>
                          <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                              <Button appearance="secondary">Abbrechen</Button>
                            </DialogTrigger>
                            <Button appearance="primary" onClick={handleDeleteConfirm}>
                              Löschen
                            </Button>
                          </DialogActions>
                        </DialogBody>
                      </DialogSurface>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <FluentText size={300}>Keine Kunden gefunden.</FluentText>
                  <div className="mt-2">
                    <Link href="/kunden/neu">
                      <Button>Ersten Kunden anlegen</Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 
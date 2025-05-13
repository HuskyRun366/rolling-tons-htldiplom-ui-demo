"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Title2,
  Card,
  Input,
  Label,
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
  Search24Regular,
  FilterRegular,
  ArrowDownRegular,
} from "@fluentui/react-icons";
import { useKunden } from "@/contexts/KundenContext";
import type { Kunde } from "@/contexts/KundenContext";

export default function KundenPage() {
  const { kunden, deleteKunde } = useKunden();
  const router = useRouter();
  const [kundeToDelete, setKundeToDelete] = useState<Kunde | null>(null);

  // Filter and Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOptionKunden, setSortOptionKunden] = useState("name-asc"); // Default sort

  const handleDeleteConfirm = () => {
    if (kundeToDelete) {
      deleteKunde(kundeToDelete.id);
      setKundeToDelete(null);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSortOptionKunden("name-asc");
  };

  // Memoized filtered and sorted kunden
  const processedKunden = useMemo(() => {
    let filtered = kunden;

    // Search filter
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (kunde) =>
          kunde.name.toLowerCase().includes(lowerQuery) ||
          kunde.ansprechpartner.some((ap) => ap.toLowerCase().includes(lowerQuery))
      );
    }

    // Sorting
    if (sortOptionKunden === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOptionKunden === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }
    // Add more sort options here if needed in the future

    return filtered;
  }, [kunden, searchQuery, sortOptionKunden]);

  const sortOptions = [
    { value: "name-asc", text: "Name (A-Z)" },
    { value: "name-desc", text: "Name (Z-A)" },
  ];

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

      {/* Filter and Sort Controls */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-1 lg:col-span-1"> {/* Search takes full width on small, 1/3 on large */}
              <Label htmlFor="kunden-search">Suche</Label>
              <Input
                id="kunden-search"
                placeholder="Nach Name, Ansprechpartner..."
                contentBefore={<Search24Regular />}
                value={searchQuery}
                onChange={(e, data) => setSearchQuery(data.value)}
                className="h-10"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="kunden-sorting">Sortierung</Label>
              <select
                id="kunden-sorting"
                value={sortOptionKunden}
                onChange={(e) => setSortOptionKunden(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-10 text-sm bg-white"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button icon={<FilterRegular />} onClick={resetFilters}>
              Filter zurücksetzen
            </Button>
            <Button icon={<ArrowDownRegular />} appearance="outline" disabled> {/* Placeholder Export */}
              Exportieren
            </Button>
          </div>
        </div>
      </Card>

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
            {processedKunden.length > 0 ? (
              processedKunden.map((kunde) => (
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
                  <FluentText size={300}>
                    {searchQuery || sortOptionKunden !== "name-asc" 
                      ? "Keine passenden Kunden gefunden." 
                      : "Keine Kunden gefunden."}
                  </FluentText>
                  {(searchQuery || sortOptionKunden !== "name-asc") && (
                    <div className="mt-2">
                      <Button onClick={resetFilters}>Filter zurücksetzen</Button>
                    </div>
                  )}
                  {!searchQuery && sortOptionKunden === "name-asc" && kunden.length === 0 && (
                     <div className="mt-2">
                        <Link href="/kunden/neu">
                          <Button>Ersten Kunden anlegen</Button>
                        </Link>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 
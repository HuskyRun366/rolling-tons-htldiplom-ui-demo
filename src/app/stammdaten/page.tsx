"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Button, 
  Title2, 
  Card, 
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Text,
  TabList,
  Tab,
  TabValue,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Input,
  Label
} from "@fluentui/react-components";
import { 
  AddRegular,
  AppsRegular,
  MoneyRegular,
  BuildingRegular,
  EditRegular,
  DeleteRegular,
  SearchRegular
} from "@fluentui/react-icons";
import { useBahnhoefe } from "@/contexts/BahnhofContext";
import { useKostenkomponenten, Kostenkomponente } from "@/contexts/KostenkomponenteContext";

export default function Stammdaten() {
  const { bahnhoefe, deleteBahnhof } = useBahnhoefe();
  const { 
    kostenkomponenten, 
    deleteKostenkomponente 
  } = useKostenkomponenten();

  const [selectedTab, setSelectedTab] = useState<TabValue>("bahnhoefe");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [entityToDelete, setEntityToDelete] = useState<'bahnhof' | 'kostenkomponente' | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Filter bahnhoefe based on search term
  const filteredBahnhoefe = bahnhoefe.filter(bahnhof => {
    return (
      bahnhof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bahnhof.bahnhofId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bahnhof.land.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bahnhof.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Filter kostenkomponenten based on search term
  const filteredKostenkomponenten = kostenkomponenten.filter(kk => {
    return (
      kk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kk.typ.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kk.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kk.betrag.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      (kk.beschreibung && kk.beschreibung.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Handle tab change
  const handleTabChange = (tab: TabValue) => {
    setSelectedTab(tab);
    setSearchTerm(""); // Reset search term when tab changes
  };

  // Handle delete confirmation for Bahnhof
  const handleDeleteBahnhof = (id: string) => {
    setConfirmDeleteId(id);
    setEntityToDelete("bahnhof");
    setIsDeleteDialogOpen(true);
  };

  // Handle delete confirmation for Kostenkomponente
  const handleDeleteKostenkomponente = (id: string) => {
    setConfirmDeleteId(id);
    setEntityToDelete("kostenkomponente");
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (confirmDeleteId) {
      if (entityToDelete === 'bahnhof') {
        deleteBahnhof(confirmDeleteId);
      } else if (entityToDelete === 'kostenkomponente') {
        deleteKostenkomponente(confirmDeleteId);
      }
      setConfirmDeleteId(null);
      setEntityToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  // Calculate statistics
  const bahnhoefeLaender = bahnhoefe.reduce((acc, bahnhof) => {
    const land = bahnhof.land;
    acc[land] = (acc[land] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>Stammdaten</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Title2>Stammdaten</Title2>
      </div>

      <Card>
        <div className="px-4 pt-4">
          <TabList selectedValue={selectedTab} onTabSelect={(_, data) => handleTabChange(data.value)}>
            <Tab value="bahnhoefe">Bahnhöfe</Tab>
            <Tab value="kostenkomponenten">Kostenkomponenten</Tab>
            <Tab value="lieferanten">Lieferanten & Partner</Tab>
            <Tab value="konditionen">Konditionen</Tab>
          </TabList>
        </div>
        
        <div className="p-4">
          {selectedTab === "bahnhoefe" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Text weight="semibold" size={400}>Bahnhofsdaten</Text>
                  <div className="relative">
                    <Input 
                      placeholder="Suchen..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      contentBefore={<SearchRegular />}
                      className="w-64"
                    />
                  </div>
                </div>
                <Link href="/stammdaten/bahnhoefe/neu">
                  <Button appearance="primary" icon={<AddRegular />}>Bahnhof hinzufügen</Button>
                </Link>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Bahnhofname</TableHeaderCell>
                    <TableHeaderCell>Bahnhof-ID</TableHeaderCell>
                    <TableHeaderCell>Land</TableHeaderCell>
                    <TableHeaderCell>Region</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Aktionen</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBahnhoefe.map((bahnhof) => (
                    <TableRow key={bahnhof.id}>
                      <TableCell>{bahnhof.name}</TableCell>
                      <TableCell>{bahnhof.bahnhofId}</TableCell>
                      <TableCell>{bahnhof.land}</TableCell>
                      <TableCell>{bahnhof.region}</TableCell>
                      <TableCell>
                        <Badge color={bahnhof.status === 'aktiv' ? 'success' : 'warning'}>
                          {bahnhof.status === 'aktiv' ? 'Aktiv' : 'Inaktiv'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Link href={`/stammdaten/bahnhoefe/${bahnhof.id}`}>
                            <Button icon={<EditRegular />} size="medium">Bearbeiten</Button>
                          </Link>
                          <Button 
                            icon={<DeleteRegular />} 
                            size="medium"
                            appearance="transparent"
                            onClick={() => handleDeleteBahnhof(bahnhof.id)}
                          >
                            Löschen
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 flex items-start gap-6">
                <Card className="flex-1">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <AppsRegular className="mr-2 text-blue-600 text-xl" />
                      <Text weight="semibold" size={400}>Bahnhöfe pro Land</Text>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      {Object.entries(bahnhoefeLaender).map(([land, anzahl]) => (
                        <div key={land} className="border-b pb-2">
                          <Text className="text-sm text-gray-500">{land}</Text>
                          <div className="flex items-baseline gap-2">
                            <Title2>{anzahl}</Title2>
                            <Text size={200} className="text-gray-500">Bahnhöfe</Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                
                <Card className="flex-1">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <MoneyRegular className="mr-2 text-green-600 text-xl" />
                      <Text weight="semibold" size={400}>Kostenkomponenten Status</Text>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-b pb-2">
                        <Text className="text-sm text-gray-500">Aktive Kostenelemente</Text>
                        <div className="flex items-baseline gap-2">
                          <Title2>34</Title2>
                          <Text size={200} className="text-gray-500">Elemente</Text>
                        </div>
                      </div>
                      <div className="border-b pb-2">
                        <Text className="text-sm text-gray-500">Inaktive Elemente</Text>
                        <div className="flex items-baseline gap-2">
                          <Title2>8</Title2>
                          <Text size={200} className="text-gray-500">Elemente</Text>
                        </div>
                      </div>
                      <div className="border-b pb-2">
                        <Text className="text-sm text-gray-500">Laufende Verträge</Text>
                        <div className="flex items-baseline gap-2">
                          <Title2>12</Title2>
                          <Text size={200} className="text-gray-500">Verträge</Text>
                        </div>
                      </div>
                      <div className="border-b pb-2">
                        <Text className="text-sm text-gray-500">Ablaufende Verträge</Text>
                        <div className="flex items-baseline gap-2">
                          <Title2>3</Title2>
                          <Text size={200} className="text-gray-500">Verträge</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="flex-1">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <BuildingRegular className="mr-2 text-purple-600 text-xl" />
                      <Text weight="semibold" size={400}>Partner & Lieferanten</Text>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-b pb-2">
                        <Text className="text-sm text-gray-500">Aktive Partner</Text>
                        <div className="flex items-baseline gap-2">
                          <Title2>16</Title2>
                          <Text size={200} className="text-gray-500">Partner</Text>
                        </div>
                      </div>
                      <div className="border-b pb-2">
                        <Text className="text-sm text-gray-500">Aktive Lieferanten</Text>
                        <div className="flex items-baseline gap-2">
                          <Title2>22</Title2>
                          <Text size={200} className="text-gray-500">Lieferanten</Text>
                        </div>
                      </div>
                      <div className="border-b pb-2">
                        <Text className="text-sm text-gray-500">Neue Partner (30d)</Text>
                        <div className="flex items-baseline gap-2">
                          <Title2>2</Title2>
                          <Text size={200} className="text-gray-500">Partner</Text>
                        </div>
                      </div>
                      <div className="border-b pb-2">
                        <Text className="text-sm text-gray-500">Bewertung (Ø)</Text>
                        <div className="flex items-baseline gap-2">
                          <Title2>4.2</Title2>
                          <Text size={200} className="text-gray-500">von 5</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}
          
          {selectedTab === "kostenkomponenten" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Text weight="semibold" size={400}>Kostenkomponenten</Text>
                  <div className="relative">
                    <Input 
                      placeholder="Suchen..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      contentBefore={<SearchRegular />}
                      className="w-64"
                    />
                  </div>
                </div>
                <Link href="/stammdaten/kostenkomponenten/neu">
                  <Button appearance="primary" icon={<AddRegular />}>Komponente hinzufügen</Button>
                </Link>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Typ</TableHeaderCell>
                    <TableHeaderCell>Betrag</TableHeaderCell>
                    <TableHeaderCell>Einheit</TableHeaderCell>
                    <TableHeaderCell>Währung</TableHeaderCell>
                    <TableHeaderCell>Gültig Von</TableHeaderCell>
                    <TableHeaderCell>Gültig Bis</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Aktionen</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKostenkomponenten.length > 0 ? (
                    filteredKostenkomponenten.map((kk) => (
                      <TableRow key={kk.id}>
                        <TableCell>{kk.name}</TableCell>
                        <TableCell>{kk.typ}</TableCell>
                        <TableCell>{kk.betrag.toFixed(2)}</TableCell>
                        <TableCell>{kk.einheit}</TableCell>
                        <TableCell>{kk.waehrung}</TableCell>
                        <TableCell>{new Date(kk.gueltigVon).toLocaleDateString()}</TableCell>
                        <TableCell>{kk.gueltigBis ? new Date(kk.gueltigBis).toLocaleDateString() : '-'}</TableCell>
                        <TableCell>
                          <Badge color={kk.status === 'aktiv' ? 'success' : 'warning'}>
                            {kk.status.charAt(0).toUpperCase() + kk.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Link href={`/stammdaten/kostenkomponenten/${kk.id}`}>
                              <Button icon={<EditRegular />} size="medium">Bearbeiten</Button>
                            </Link>
                            <Button 
                              icon={<DeleteRegular />} 
                              size="medium"
                              appearance="transparent"
                              onClick={() => handleDeleteKostenkomponente(kk.id)}
                            >
                              Löschen
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} style={{ textAlign: "center", padding: "20px" }}>
                        Keine Kostenkomponenten gefunden oder passend zum Suchbegriff.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
          
          {selectedTab === "lieferanten" && (
            <div>Lieferanten-Inhalt (noch nicht implementiert)</div>
          )}
          
          {selectedTab === "konditionen" && (
            <div>Konditionen-Inhalt (noch nicht implementiert)</div>
          )}
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={(e, data) => setIsDeleteDialogOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>
              {entityToDelete === 'bahnhof' && "Bahnhof löschen"}
              {entityToDelete === 'kostenkomponente' && "Kostenkomponente löschen"}
            </DialogTitle>
            <DialogContent>
              Sind Sie sicher, dass Sie dieses Element löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsDeleteDialogOpen(false)}>Abbrechen</Button>
              <Button appearance="primary" onClick={handleDeleteConfirm}>Löschen</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
} 
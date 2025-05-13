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

export default function Stammdaten() {
  const { bahnhoefe, deleteBahnhof } = useBahnhoefe();
  const [selectedTab, setSelectedTab] = useState<TabValue>("bahnhoefe");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
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

  // Handle tab change
  const handleTabChange = (tab: TabValue) => {
    setSelectedTab(tab);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (confirmDeleteId) {
      deleteBahnhof(confirmDeleteId);
      setConfirmDeleteId(null);
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
                      <TableCell className="flex space-x-2">
                        <Link href={`/stammdaten/bahnhoefe/${bahnhof.id}`}>
                          <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
                        </Link>
                        <Button 
                          icon={<DeleteRegular />} 
                          size="small"
                          onClick={() => {
                            setConfirmDeleteId(bahnhof.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          Löschen
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 flex items-start gap-6">
                <Card className="flex-1">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <AppsRegular className="mr-2 text-blue-600" />
                      <Text weight="semibold">Bahnhöfe pro Land</Text>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(bahnhoefeLaender).map(([land, anzahl]) => (
                        <div key={land}>
                          <Text>{land}</Text>
                          <Title2>{anzahl}</Title2>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                
                <Card className="flex-1">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <MoneyRegular className="mr-2 text-green-600" />
                      <Text weight="semibold">Kostenkomponenten Status</Text>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Text>Aktive Kostenelemente</Text>
                        <Title2>34</Title2>
                      </div>
                      <div>
                        <Text>Inaktive Elemente</Text>
                        <Title2>8</Title2>
                      </div>
                      <div>
                        <Text>Laufende Verträge</Text>
                        <Title2>12</Title2>
                      </div>
                      <div>
                        <Text>Ablaufende Verträge</Text>
                        <Title2>3</Title2>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="flex-1">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <BuildingRegular className="mr-2 text-purple-600" />
                      <Text weight="semibold">Partner & Lieferanten</Text>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Text>Aktive Partner</Text>
                        <Title2>16</Title2>
                      </div>
                      <div>
                        <Text>Aktive Lieferanten</Text>
                        <Title2>22</Title2>
                      </div>
                      <div>
                        <Text>Neue Partner (30d)</Text>
                        <Title2>2</Title2>
                      </div>
                      <div>
                        <Text>Bewertung (Ø)</Text>
                        <Title2>4.2</Title2>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}
          
          {selectedTab === "kostenkomponenten" && (
            <div>Kostenkomponenten-Inhalt (noch nicht implementiert)</div>
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
            <DialogTitle>Bahnhof löschen</DialogTitle>
            <DialogContent>
              Sind Sie sicher, dass Sie diesen Bahnhof löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
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
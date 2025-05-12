"use client";

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
  Badge
} from "@fluentui/react-components";
import { 
  AddRegular,
  AppsRegular,
  MoneyRegular,
  BuildingRegular,
  EditRegular
} from "@fluentui/react-icons";

export default function Stammdaten() {
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
          <TabList defaultSelectedValue="bahnhoefe">
            <Tab value="bahnhoefe">Bahnhöfe</Tab>
            <Tab value="kostenkomponenten">Kostenkomponenten</Tab>
            <Tab value="lieferanten">Lieferanten & Partner</Tab>
            <Tab value="konditionen">Konditionen</Tab>
          </TabList>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Text weight="semibold" size={400}>Bahnhofsdaten</Text>
            <Button appearance="primary" icon={<AddRegular />}>Bahnhof hinzufügen</Button>
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
              <TableRow>
                <TableCell>Wien Hauptbahnhof</TableCell>
                <TableCell>ATWI001</TableCell>
                <TableCell>Österreich</TableCell>
                <TableCell>Wien</TableCell>
                <TableCell><Badge color="success">Aktiv</Badge></TableCell>
                <TableCell className="flex space-x-2">
                  <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>München Hauptbahnhof</TableCell>
                <TableCell>DEMH001</TableCell>
                <TableCell>Deutschland</TableCell>
                <TableCell>Bayern</TableCell>
                <TableCell><Badge color="success">Aktiv</Badge></TableCell>
                <TableCell className="flex space-x-2">
                  <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Berlin Hauptbahnhof</TableCell>
                <TableCell>DEBE001</TableCell>
                <TableCell>Deutschland</TableCell>
                <TableCell>Berlin</TableCell>
                <TableCell><Badge color="success">Aktiv</Badge></TableCell>
                <TableCell className="flex space-x-2">
                  <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Zürich Hauptbahnhof</TableCell>
                <TableCell>CHZH001</TableCell>
                <TableCell>Schweiz</TableCell>
                <TableCell>Zürich</TableCell>
                <TableCell><Badge color="success">Aktiv</Badge></TableCell>
                <TableCell className="flex space-x-2">
                  <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Budapest Keleti</TableCell>
                <TableCell>HUBK001</TableCell>
                <TableCell>Ungarn</TableCell>
                <TableCell>Budapest</TableCell>
                <TableCell><Badge color="success">Aktiv</Badge></TableCell>
                <TableCell className="flex space-x-2">
                  <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Salzburg Hauptbahnhof</TableCell>
                <TableCell>ATSZ001</TableCell>
                <TableCell>Österreich</TableCell>
                <TableCell>Salzburg</TableCell>
                <TableCell><Badge color="success">Aktiv</Badge></TableCell>
                <TableCell className="flex space-x-2">
                  <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hamburg Hauptbahnhof</TableCell>
                <TableCell>DEHH001</TableCell>
                <TableCell>Deutschland</TableCell>
                <TableCell>Hamburg</TableCell>
                <TableCell><Badge color="success">Aktiv</Badge></TableCell>
                <TableCell className="flex space-x-2">
                  <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
                </TableCell>
              </TableRow>
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
                  <div>
                    <Text>Österreich</Text>
                    <Title2>18</Title2>
                  </div>
                  <div>
                    <Text>Deutschland</Text>
                    <Title2>26</Title2>
                  </div>
                  <div>
                    <Text>Schweiz</Text>
                    <Title2>12</Title2>
                  </div>
                  <div>
                    <Text>Ungarn</Text>
                    <Title2>8</Title2>
                  </div>
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
        </div>
      </Card>
    </div>
  );
} 
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Button, 
  Title2, 
  Card, 
  Input, 
  Dropdown, 
  Option,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  Checkbox,
  Label,
  Text as FluentText
} from "@fluentui/react-components";
import { 
  DocumentAdd24Regular, 
  DocumentPdf20Regular, 
  DocumentSearch24Regular, 
  Search24Regular,
  FilterRegular,
  ArrowDownRegular,
  DeleteRegular,
  EditRegular
} from "@fluentui/react-icons";
import { useAngebote } from "@/contexts/AngebotContext";

export default function Angebote() {
  const { 
    angebote, 
    currentPage, 
    itemsPerPage, 
    totalPages, 
    setPage,
    deleteAngebot 
  } = useAngebote();
  
  // Filter-Status
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [onlyMyOffers, setOnlyMyOffers] = useState(false);
  
  // Angebote filtern und sortieren
  const filteredAngebote = angebote
    .filter(angebot => {
      // Suche
      if (searchQuery && !Object.values(angebot).some(value => 
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )) {
        return false;
      }
      
      // Status
      if (statusFilter !== 'all' && angebot.status !== statusFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.erstelldatum.split('.').reverse().join('-')).getTime() - 
                 new Date(a.erstelldatum.split('.').reverse().join('-')).getTime();
        case 'oldest':
          return new Date(a.erstelldatum.split('.').reverse().join('-')).getTime() - 
                 new Date(b.erstelldatum.split('.').reverse().join('-')).getTime();
        case 'amount-high':
          return parseFloat(b.summe.replace('€', '').replace('.', '').replace(',', '.')) - 
                 parseFloat(a.summe.replace('€', '').replace('.', '').replace(',', '.'));
        case 'amount-low':
          return parseFloat(a.summe.replace('€', '').replace('.', '').replace(',', '.')) - 
                 parseFloat(b.summe.replace('€', '').replace('.', '').replace(',', '.'));
        default:
          return 0;
      }
    });
  
  // Paginierte Angebote
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAngebote = filteredAngebote.slice(startIndex, endIndex);
  
  // Filter zurücksetzen
  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDateFilter('all');
    setSortOption('newest');
    setOnlyMyOffers(false);
  };
  
  // Status-Badge-Farbe bestimmen
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'offen': return 'warning';
      case 'angenommen': return 'success';
      case 'abgelehnt': return 'danger';
      case 'storniert': return 'informative';
      default: return 'subtle';
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
          <BreadcrumbItem>Angebote</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Title2>Angebote</Title2>
        <Link href="/angebote/neu">
          <Button appearance="primary" icon={<DocumentAdd24Regular />}>Neues Angebot</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="search">Suche</Label>
              <Input
                id="search"
                placeholder="Nach Angebotsnr., Kunde, Route..."
                contentBefore={<Search24Regular />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Dropdown 
                id="status-filter" 
                placeholder="Alle Status"
                value={statusFilter}
                onOptionSelect={(_, data) => setStatusFilter(data.optionValue || 'all')}
              >
                <Option value="all">Alle Status</Option>
                <Option value="offen">Offen</Option>
                <Option value="angenommen">Angenommen</Option>
                <Option value="abgelehnt">Abgelehnt</Option>
                <Option value="storniert">Storniert</Option>
              </Dropdown>
            </div>
            
            <div>
              <Label htmlFor="date-filter">Datum</Label>
              <Dropdown 
                id="date-filter" 
                placeholder="Alle Zeiträume"
                value={dateFilter}
                onOptionSelect={(_, data) => setDateFilter(data.optionValue || 'all')}
              >
                <Option value="all">Alle Zeiträume</Option>
                <Option value="today">Heute</Option>
                <Option value="week">Diese Woche</Option>
                <Option value="month">Dieser Monat</Option>
                <Option value="custom">Benutzerdefiniert</Option>
              </Dropdown>
            </div>
            
            <div>
              <Label htmlFor="sorting">Sortierung</Label>
              <Dropdown 
                id="sorting" 
                placeholder="Sortieren nach"
                value={sortOption}
                onOptionSelect={(_, data) => setSortOption(data.optionValue || 'newest')}
              >
                <Option value="newest">Neueste zuerst</Option>
                <Option value="oldest">Älteste zuerst</Option>
                <Option value="amount-high">Betrag (hoch-niedrig)</Option>
                <Option value="amount-low">Betrag (niedrig-hoch)</Option>
              </Dropdown>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button icon={<FilterRegular />} onClick={resetFilters}>Filter zurücksetzen</Button>
            <Button icon={<ArrowDownRegular />}>Exportieren</Button>
            <Divider vertical />
            <Checkbox 
              label="Meine Angebote" 
              checked={onlyMyOffers}
              onChange={(_, data) => setOnlyMyOffers(!!data.checked)}
            />
          </div>
        </div>
      </Card>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Angebotsnr.</TableHeaderCell>
              <TableHeaderCell>Kunde</TableHeaderCell>
              <TableHeaderCell>Route</TableHeaderCell>
              <TableHeaderCell>Erstelldatum</TableHeaderCell>
              <TableHeaderCell>Summe</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Aktionen</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAngebote.length > 0 ? (
              paginatedAngebote.map((angebot) => (
                <TableRow key={angebot.id}>
                  <TableCell>{angebot.nummer}</TableCell>
                  <TableCell>{angebot.kunde}</TableCell>
                  <TableCell>{angebot.route}</TableCell>
                  <TableCell>{angebot.erstelldatum}</TableCell>
                  <TableCell>{angebot.summe}</TableCell>
                  <TableCell>
                    <Badge color={getStatusBadgeColor(angebot.status) as any}>
                      {angebot.status.charAt(0).toUpperCase() + angebot.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Link href={`/angebote/${angebot.id}`}>
                      <Button icon={<DocumentSearch24Regular />} size="small">Details</Button>
                    </Link>
                    <Button icon={<DocumentPdf20Regular />} size="small">PDF</Button>
                    <Link href={`/angebote/${angebot.id}/bearbeiten`}>
                      <Button icon={<EditRegular />} size="small">Bearbeiten</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <FluentText size={300}>Keine passenden Angebote gefunden.</FluentText>
                  <div className="mt-2">
                    <Button onClick={resetFilters}>Filter zurücksetzen</Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="p-4 flex justify-between items-center">
          <FluentText>
            Zeige {Math.min(filteredAngebote.length, startIndex + 1)}-{Math.min(filteredAngebote.length, endIndex)} von {filteredAngebote.length} Angeboten
          </FluentText>
          {totalPages > 1 && (
            <div className="flex space-x-2">
              <Button 
                appearance="subtle" 
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
              >
                Zurück
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Einfache Paginierung für maximal 5 Seiten
                let pageNum = i + 1;
                
                // Falls wir mehr als 5 Seiten haben, stellen wir sicher, dass die aktuelle Seite zu sehen ist
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = Math.min(totalPages - 4 + i, totalPages);
                  if (currentPage > totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  }
                }
                
                return (
                  <Button 
                    key={pageNum}
                    appearance={currentPage === pageNum ? "primary" : "subtle"}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button 
                appearance="subtle" 
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
              >
                Weiter
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
} 
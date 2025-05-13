"use client";

import { useState, useEffect } from "react";
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

// Hilfsfunktion zum Parsen des Datums (DD.MM.YYYY)
const parseDate = (dateString: string): Date | null => {
  const parts = dateString.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (!parts) return null;
  // Monate sind 0-basiert in JavaScript Date
  return new Date(parseInt(parts[3], 10), parseInt(parts[2], 10) - 1, parseInt(parts[1], 10));
};

// Options for Dropdowns
const statusOptions = [
  { value: 'all', text: 'Alle Status' },
  { value: 'offen', text: 'Offen' },
  { value: 'angenommen', text: 'Angenommen' },
  { value: 'abgelehnt', text: 'Abgelehnt' },
  { value: 'storniert', text: 'Storniert' },
];

const dateOptions = [
  { value: 'all', text: 'Alle Zeiträume' },
  { value: 'today', text: 'Heute' },
  { value: 'week', text: 'Diese Woche' },
  { value: 'month', text: 'Dieser Monat' },
  { value: 'custom', text: 'Benutzerdefiniert' }, // Keep custom option, even if not fully implemented
];

const sortOptionsData = [
  { value: 'newest', text: 'Neueste zuerst' },
  { value: 'oldest', text: 'Älteste zuerst' },
  { value: 'amount-high', text: 'Betrag (hoch-niedrig)' },
  { value: 'amount-low', text: 'Betrag (niedrig-hoch)' },
];

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
  
  // Effekt zum Zurücksetzen der Seite bei Filteränderungen
  useEffect(() => {
    setPage(1);
  }, [searchQuery, statusFilter, dateFilter, sortOption, onlyMyOffers, setPage]);
  
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
      
      // Datum
      if (dateFilter !== 'all') {
        const offerDate = parseDate(angebot.erstelldatum);
        if (!offerDate) return false; // Datum konnte nicht geparsed werden

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (dateFilter) {
          case 'today':
            if (offerDate.getTime() !== today.getTime()) {
              return false;
            }
            break;
          case 'week':
            const firstDayOfWeek = new Date(today);
            const dayOfWeek = today.getDay(); // 0 = Sonntag, 1 = Montag, ...
            const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Montag als erster Tag
            firstDayOfWeek.setDate(diff);
            firstDayOfWeek.setHours(0, 0, 0, 0);
            const lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
            lastDayOfWeek.setHours(23, 59, 59, 999);
            if (offerDate < firstDayOfWeek || offerDate > lastDayOfWeek) {
              return false;
            }
            break;
          case 'month':
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            lastDayOfMonth.setHours(23, 59, 59, 999);
            if (offerDate < firstDayOfMonth || offerDate > lastDayOfMonth) {
              return false;
            }
            break;
          // 'custom' würde hier implementiert werden, falls DatePicker hinzugefügt wird
        }
      }
      
      // "Meine Angebote" (Placeholder - Annahme: Es gibt ein 'createdBy' Feld)
      if (onlyMyOffers) {
        // Hier müsste die Logik hin, um zu prüfen, ob das Angebot vom
        // aktuellen Benutzer erstellt wurde. Beispiel:
        // const currentUserId = "user123"; // ID des eingeloggten Benutzers
        // if (angebot.createdBy !== currentUserId) { 
        //   return false;
        // }
        // Da 'createdBy' noch nicht existiert, filtern wir erstmal nichts
        // TODO: Implementieren, wenn Benutzerdaten verfügbar sind.
        console.warn("'Meine Angebote' Filter ist noch nicht implementiert.");
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <Label htmlFor="search">Suche</Label>
              <Input
                id="search"
                placeholder="Nach Angebotsnr., Kunde, Route..."
                contentBefore={<Search24Regular />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <Label htmlFor="status-filter">Status</Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-10 text-sm bg-white"
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-1">
              <Label htmlFor="date-filter">Datum</Label>
              <select
                id="date-filter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-10 text-sm bg-white"
              >
                {dateOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-1">
              <Label htmlFor="sorting">Sortierung</Label>
              <select
                id="sorting"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-10 text-sm bg-white"
              >
                {sortOptionsData.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <Button icon={<FilterRegular />} onClick={resetFilters}>Filter zurücksetzen</Button>
            <Button icon={<ArrowDownRegular />}>Exportieren</Button>
            <div className="flex items-center">
              <Checkbox 
                id="my-offers-checkbox"
                label="Meine Angebote" 
                checked={onlyMyOffers}
                onChange={(_, data) => setOnlyMyOffers(!!data.checked)}
              />
            </div>
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
'use client'
import { DetailsList, IColumn, IconButton } from '@fluentui/react';
import Link from 'next/link';
import type { Offer } from '@/app/types';

async function getOffers(): Promise<Offer[]> {
  const res = await fetch('http://localhost:8080/api/offers', { cache: 'no-store' });
  return res.json();
}

export default async function OfferListPage() {
  const offers = await getOffers();

  const columns: IColumn[] = [
    { key: 'customer', name: 'Kunde', fieldName: 'customer', minWidth: 120 },
    { key: 'title', name: 'Titel', fieldName: 'title', minWidth: 160 },
    { key: 'total', name: 'Betrag (€)', fieldName: 'total', minWidth: 90 },
    {
      key: 'pdf',
      name: 'PDF',
      minWidth: 60,
      onRender: (item: Offer) => (
        <Link href={`http://localhost:8080/api/offers/${item.id}/pdf`} target="_blank">
          <IconButton iconProps={{ iconName: 'PDF' }} ariaLabel="PDF anzeigen" />
        </Link>
      ),
    },
  ];

  return <DetailsList items={offers} columns={columns} />;
}

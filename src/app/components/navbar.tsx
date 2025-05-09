'use client';
import { Nav, INavLinkGroup } from '@fluentui/react';
import { useRouter, usePathname } from 'next/navigation';

const links: INavLinkGroup[] = [
  {
    links: [
      { name: 'Angebote', url: '/offers', key: '/offers', icon: 'Stack' },
      { name: 'Neu', url: '/offers/new', key: '/offers/new', icon: 'Add' },
    ],
  },
];

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Nav
      groups={links}
      selectedKey={pathname}
      onLinkClick={(ev, item) => {
        ev?.preventDefault();
        item?.url && router.push(item.url);
      }}
      styles={{ root: { width: 240, height: '100vh', borderRight: '1px solid #eee' } }}
    />
  );
}

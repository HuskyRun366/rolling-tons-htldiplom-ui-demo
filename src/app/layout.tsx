'use client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import NavBar from './components/navbar';

//export const metadata = { title: 'Quote-2-PDF Demo' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <FluentProvider theme={webLightTheme}>
          <div style={{ display: 'flex' }}>
            <NavBar />
            <main style={{ flex: 1, padding: 24 }}>{children}</main>
          </div>
        </FluentProvider>
      </body>
    </html>
  );
}

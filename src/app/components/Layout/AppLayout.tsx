'use client';

import Header from './Header';
import Footer from './Footer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
  );
}

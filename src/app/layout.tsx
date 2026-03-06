import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DataMinder',
  description: 'Simplified multi-table data management for non-technical users.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Header />
        <main className="px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
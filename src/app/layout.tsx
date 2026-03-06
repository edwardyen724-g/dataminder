import React from 'react';
import { Inter } from 'next/font/google';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DataMinder',
  description: 'Simplified multi-table data management for non-technical users.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Header />
        <main className="container mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
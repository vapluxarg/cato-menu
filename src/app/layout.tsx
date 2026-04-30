import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cato - Digital Menu",
  description: "Digital menu for Cato - Cafe & Bar",
};

import localFont from 'next/font/local';

const momoTrust = localFont({
  src: '../../public/MomoTrustDisplay-Regular.ttf',
  variable: '--font-momo',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${momoTrust.variable}`}>
      <body>{children}</body>
    </html>
  );
}

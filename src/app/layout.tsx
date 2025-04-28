import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import AppLayout from "./components/Layout/AppLayout";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Oswald, Roboto, Gloria_Hallelujah } from 'next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const gloriaHallelujah = Gloria_Hallelujah({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-gloria',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "NASS x JASON - Empowering Superintendents",
  description: "Join a nationwide community shaping the future of education"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${roboto.variable} ${gloriaHallelujah.variable}`}>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </head>
      <body id="main-body">
        <AntdRegistry>
          <Providers>
            <AppLayout>{children}</AppLayout>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}

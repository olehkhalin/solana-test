import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "@solana/wallet-adapter-react-ui/styles.css";

import Creator from "components/Creator";
import Header from "components/Header";
import ToastWrapper from "components/ToastWrapper";
import WalletGlobalProvider from "components/WalletGlobalProvider";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solana network workaround | artkhalin labs",
  description:
    "Creative developer living in USA, co-founder of vigvam.app, former lead developer at mad.fish. Featured projects: vigvam.app, stakeme.io, spooky.artkhalin.com, ilonakcopywrite.com, young-mystic.com.",
  openGraph: {
    title: "Solana network workaround | artkhalin labs",
    description:
      "Creative developer living in USA, co-founder of vigvam.app, former lead developer at mad.fish. Featured projects: vigvam.app, stakeme.io, spooky.artkhalin.com, ilonakcopywrite.com, young-mystic.com.",
    url: "https://nextjs.org",
    siteName: "Solana network workaround | artkhalin labs",
    images: [
      {
        url: "https://solana.artkhalin.com/og_image.jpg",
        width: 1440,
        height: 860,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    site: "Solana network workaround | artkhalin labs",
    creator: "@olehkhalin",
    description:
      "Creative developer living in USA, co-founder of vigvam.app, former lead developer at mad.fish. Featured projects: vigvam.app, stakeme.io, spooky.artkhalin.com, ilonakcopywrite.com, young-mystic.com.",
    title: "Solana network workaround | artkhalin labs",
    images: [
      {
        url: "https://solana.artkhalin.com/og_image.jpg",
        width: 1440,
        height: 860,
      },
    ],
    card: "summary_large_image",
  },
  generator: "Next.js",
  creator: "@olehkhalin",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <WalletGlobalProvider>
          <Header />
          {children}
        </WalletGlobalProvider>
        <ToastWrapper />
        <Creator />
      </body>
    </html>
  );
}

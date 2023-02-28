import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "@solana/wallet-adapter-react-ui/styles.css";

import Creator from "components/Creator";
import Header from "components/Header";
import ToastWrapper from "components/ToastWrapper";
import WalletGlobalProvider from "components/WalletGlobalProvider";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter();

import "../globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
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

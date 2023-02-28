import { ReactNode } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";

import Creator from "components/Creator";
import Header from "components/Header";
import ToastWrapper from "components/ToastWrapper";
import WalletGlobalProvider from "components/WalletGlobalProvider";

import "../globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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

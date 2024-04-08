"use client";

import { Spectral } from "next/font/google";
import "./globals.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import { useMemo } from "react";
import classNames from "classnames";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";

const spectral = Spectral({
  subsets: ["latin"],
  weight: "400",

});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter()

  ], []);
  return (
    <html lang="en">
      <body className={classNames(spectral.className, "overflow-x-hidden text-white")}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
            <WalletModalProvider>
              {children}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}

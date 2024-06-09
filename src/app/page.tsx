"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import Logo from "@/../public/institutional/logo.png";

export default function Home() {
  const [hasWallet, setHasWallet] = useState(false);
  const wallet = useAnchorWallet();
  const router = useRouter();

  useEffect(() => {
    if (wallet && wallet.publicKey) {
      setHasWallet(true);
    }
  }, [wallet]);

  useEffect(() => {
    if (hasWallet) {
      router.push("/start");
    }
  }, [hasWallet, router]);

  return (
    <main
      className="
        bg-[url('/institutional/bg-lp.png')] 
        bg-cover bg-bottom min-h-screen flex flex-col justify-center 
        items-center
        gap-20
        px-6
        transition-all
      "
    >
      <Image width={400} src={Logo} alt="Seternia realms" />
      <WalletMultiButton />
    </main>
  );
}

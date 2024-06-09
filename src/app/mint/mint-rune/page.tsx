"use client";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SMintTx } from "../../../contract/transaction";
import { useRouter } from 'next/navigation'
import rune from '@/../public/components/rune.gif';
import mint from '@/../public/components/buttons/mint-button.svg';
import Image from "next/image";
import Link from "next/link";
import { Pages } from "@/presentation/enums/pages";

export default function QuickSelect() {
  const router = useRouter();
  const wallet = useAnchorWallet()
  const { connection } = useConnection()
  const { publicKey } = useWallet()

  const simple_mint = async () => {
    console.log(publicKey)
    try {
      const tx = await SMintTx(
        wallet,
        connection,
      );
      if (tx) {
        router.push('/mint/altar')
      } else {
        alert("Error in Mint NFT transaction")
      }
    } catch (error) {
      console.log("Input incorrect")
    }
  }
  return (
    <div className="flex items-center flex-col justify-center">
      <Link href={Pages.STEPS}>
        <Image className="" alt="Mint Hero" src={mint} />
      </Link>
      <Image className=" rounded-lg mb-2 " width={350} src={rune} alt="Rune" />
    </div>
  );
}

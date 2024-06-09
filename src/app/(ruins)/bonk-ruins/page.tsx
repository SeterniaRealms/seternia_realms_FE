"use client";
import Image from "next/image";
import guard from '@/../public/components/bonk-ruins/bonk-guard.svg';
import guardLabel from '@/../public/components/bonk-ruins/label-guard.svg';
import Link from "next/link";
import { Pages } from "@/presentation/enums/pages";

export default function Bonk() {

  return (
    <div className="flex flex-col justify-center items-center">
      <Link href={Pages.BONK_RUINS_DEPOSIT}>
        <div className="flex flex-col items-start justify-center absolute">
          <Image src={guardLabel} alt="Bonk Guard" />
          <Image src={guard} alt="Guard" width={200} />
        </div>
      </Link>
    </div>
  );
}
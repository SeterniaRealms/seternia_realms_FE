"use client";
import { BaseModal } from "@/components/BaseModal";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { FastTravelCard } from "@/components/FastTravelCard";
import townHall from '@/../public/components/tow-hall.svg';
import market from '@/../public/components/market.svg';
import altar from '@/../public/components/altar.svg';
import bonk from '@/../public/components/bonk.svg';
import eastDungeon from '@/../public/components/east-dungeon.svg';
import trainingBt from '@/../public/components/trainingButton.svg';


const cards = [
  {
    title: 'Find services of all kinds around here',
    buttonImg: townHall,
    link: '/start/quick-select',
    bg: 'url(/components/altar-bg.svg)',
    inactive: true
  },
  {
    title: 'Training',
    buttonImg: trainingBt,
    link: '/start/training',
    bg: 'url(/components/trainBg.png)',
    inactive: false
  },
  {
    title: 'Summon your hero',
    buttonImg: altar,
    link: '/start/mint-rune',
    bg: 'url(/components/altar-bg.svg)',
    inactive: false
  },
  {
    title: 'Explore the Bonk ruins',
    buttonImg: bonk,
    link: '/start/quick-select',
    bg: 'url(/components/dungeon-bg.svg)',
    inactive: true
  },
  {
    title: 'Explore the ruins of East',
    buttonImg: eastDungeon,
    link: '/start/quick-select',
    bg: 'url(/components/dungeon-bg.svg)',
    inactive: true
  },

]

export default function QuickSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.includes("/quick-select")) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [pathname]);

  function handleClose(): void {
    router.push('/start')
  }

  return (
    <div className="lg:px-40">
      <BaseModal isOpen={isOpen} onClose={handleClose}>
        <h2 className="text-center text-3xl mb-2">Fast Travel</h2>
        <div className="grid w-full gap-1 grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {cards.map((item) => (
            <FastTravelCard
              key={item.title}
              title={item.title}
              bg={item.bg}
              buttonImg={item.buttonImg}
              link={item.link}
              inactive={item.inactive}
            />
          ))}
        </div>
      </BaseModal>
    </div>
  );
}

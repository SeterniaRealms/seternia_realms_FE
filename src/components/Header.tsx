"use client";
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Profile } from './Profile';
import menubtn from '@/../public/components/buttons/menu-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Cog8ToothIcon, Squares2X2Icon, UserCircleIcon } from '@heroicons/react/16/solid';
import { useRecoilState } from "recoil";
import { quickSelectAtom } from '@/presentation/atoms/quickSelectAtom';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const links = [
  {
    text: 'Profile',
    url: '/start',
    icon: <UserCircleIcon width={18} />
  },
  {
    text: 'Tutorial',
    url: '/start',
    icon: <Cog8ToothIcon width={18} />
  },
  {
    text: 'Settings',
    url: '/start',
    icon: <Cog8ToothIcon width={18} />
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWalletOption, setIsOpenWalletOption] = useState(false);
  const [quickSelectState, setQuickSelectState] = useRecoilState(quickSelectAtom);
  const menuRef = useRef<HTMLUListElement>(null);
  const walletInfo = useAnchorWallet();
  const teste = useWallet();

  useEffect(() => {
    if (walletInfo) {
      walletInfo.publicKey != null;
    }
    console.log({ walletInfo, teste });
  }, [teste, walletInfo]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleLocationsClick() {
    setQuickSelectState({ open: true });
    setIsOpen(false);
  }

  return (
    <header className="w-full max-w-screen-xl flex justify-between py-4">
      <Profile />
      <div className="relative transition-all flex space-x-2 items-center">
        <button
          className="hover:scale-105 transition-all"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image src={menubtn} alt="menu" />
        </button>
        <ul
          ref={menuRef}
          className={classNames(
            'bg-main border-silver border-2 z-10 divide-y p-4 transition-all absolute top-0 -left-24',
            { hidden: !isOpen }
          )}
        >
          <li onClick={handleLocationsClick} className="flex items-center gap-1 my-1 cursor-pointer">
            <Squares2X2Icon width={18} />
            Locations
          </li>
          {links.map((item) => (
            <li key={item.text} onClick={() => setIsOpen(false)}>
              <Link className="flex items-center gap-1 my-1" href={item.url}>
                <span>{item.icon}</span>
                {item.text}
              </Link>
            </li>
          ))}

        </ul>
        <WalletMultiButton />
      </div>
    </header>
  );
}

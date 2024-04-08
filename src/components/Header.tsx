"use client";
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Profile } from './Profile';
import menubtn from '@/../public/components/menu-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Cog8ToothIcon, Squares2X2Icon, UserCircleIcon } from '@heroicons/react/16/solid';
import { useGetWalletId } from '@/presentation/hook/useGetWalletId';
import { createSignOutUsecase } from '@/factories/createSignOutUsecase';
import { useRouter } from "next/navigation";
import { Pages } from '@/presentation/enums/pages';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
const links = [
  {
    text: 'Profile',
    url: '/start',
    icon: <UserCircleIcon width={18} />
  },
  {
    text: 'Locations',
    url: '/start/quick-select',
    icon: <Squares2X2Icon width={18} />
  },
  {
    text: 'Tutorial',
    url: '/start/training',
    icon: <Cog8ToothIcon width={18} />
  },
  {
    text: 'Settings',
    url: '/start',
    icon: <Cog8ToothIcon width={18} />
  },
]

const logoff = createSignOutUsecase();

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const [wallet, setWallet] = useState<string | undefined>(undefined);
  const [isOpenWalletOption, setIsOpenWalletOption] = useState(false);
  const router = useRouter();
  const walletInfo = useAnchorWallet();
  const teste = useWallet();


  useEffect(() => {
    if (walletInfo) {
      walletInfo.publicKey != null
    }
    console.log({ walletInfo, teste });
  }, [teste, walletInfo])

  async function disconnect() {
    await logoff.execute();
    router.push(Pages.HOME)
    return;
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setWallet(useGetWalletId());
  }, [])

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

  return (
    <header className='w-full flex justify-between p-6'>
      <Profile />
      <div className='relative transition-all flex space-x-2 items-center'>
        <button className='hover:scale-95' type='button' onClick={() => setIsOpen(!isOpen)}>
          <Image src={menubtn} alt='menu' />
        </button>
        <ul ref={menuRef} className={classNames('bg-main border-silver border-2 divide-y p-4 transition-all absolute top-0 -left-24', { 'hidden': !isOpen })}>
          {links.map((item) => (
            <li key={item.text} onClick={() => setIsOpen(!isOpen)}>
              <Link className='flex items-center gap-1 my-1' href={item.url}><span>{item.icon}</span>{item.text}</Link>
            </li>
          ))}
        </ul>
        <WalletMultiButton />
        {wallet && (
          <>
          </>
        )}
      </div>
    </header>
  );
}

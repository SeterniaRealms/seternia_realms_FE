"use client"
import React from 'react';
import Image from 'next/image';
import { Accordion } from './Accordion';
import phantom from '@/../public/institutional/phantom.svg';
import backpack from '@/../public/institutional/backpack.svg';
import solflare from '@/../public/institutional/solflare.svg';
import Wallets from './Wallets';

const wallets = [
  {
    icon: phantom,
    name: 'Phantom'
  },
  {
    icon: backpack,
    name: 'Backpack'
  },
  {
    icon: solflare,
    name: 'Solflare'
  },
]

export default function ConnectWallet() {

  async function PhantomConnect() {
    console.log('')
  }

  return (
    <div className='h-72'>
      <Accordion title="Connect Wallet">
        <div className='flex justify-center border-t border-dashed flex-col items-center'>
          {wallets.map((item) => (
            <Wallets
              key={item.name}
              wallet={item.name}
              icon={item.icon}
              onClick={PhantomConnect}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
};

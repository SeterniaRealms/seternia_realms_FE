'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import mutedImg from '@/../public/components/muted.svg';
import unmutedImg from '@/../public/components/soundon.svg';
import inventory from '@/../public/components/Inventory.svg';
import heroes from '@/../public/components/heroes.svg';
import ranking from '@/../public/components/ranking.svg';

export function Footer() {

  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <footer className='w-full flex-shrink-0 flex items-center justify-between p-6'>
      <button className='hover:scale-105' type='button' onClick={toggleAudio}>
        <Image src={playing ? unmutedImg : mutedImg} alt='test' />
      </button>
      <audio ref={audioRef} loop>
        <source src='/institutional/epic.mp3' type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>
      <div className='flex justify-center items-center gap-4'>
        <button type='button' className='hover:scale-105'>
          <Image src={inventory} alt={'Inventory'} width={75} />
        </button>
        <button type='button' className='hover:scale-105'>
          <Image src={heroes} alt={'Heroes'} width={75} />
        </button>
        <button type='button' className='hover:scale-105'>
          <Image src={ranking} alt={'Ranking'} width={75} />
        </button>
      </div>
    </footer>
  );
}

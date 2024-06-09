'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import mutedImg from '@/../public/components/buttons/sound-off.svg';
import unmutedImg from '@/../public/components/buttons/sound-on.svg';
import inventory from '@/../public/components/buttons/inventory-icon.svg';
import ranking from '@/../public/components/buttons/ranking-icon.svg';

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
    <footer className='w-full max-w-screen-xl flex-shrink-0 flex items-center justify-between py-4'>
      <button className='hover:scale-105' type='button' onClick={toggleAudio}>
        <Image src={playing ? unmutedImg : mutedImg} alt='test' />
      </button>
      <audio ref={audioRef} loop>
        <source src='/institutional/epic.mp3' type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>
      <div className='flex justify-center items-center gap-4'>
        <button type='button' className='hover:scale-105 transition-all'>
          <Image src={inventory} alt={'Inventory'} width={75} />
        </button>
        <button type='button' className='hover:scale-105 transition-all'>
          <Image src={ranking} alt={'Ranking'} width={75} />
        </button>
      </div>
    </footer>
  );
}

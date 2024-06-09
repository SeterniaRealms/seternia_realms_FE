"use client";
import Image from 'next/image';
import React from 'react';
import map from '@/../public/WorldMao.png';


const Map = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={map}
        alt="Map"
        className="w-full h-full"
      />
    </div>
  );
};

export default Map;

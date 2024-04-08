"use client";
import classNames from 'classnames';
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import profile from '@/../public/components/swordsmanprnt.png';
import Link from 'next/link';

type IFastTravelCardProps = {
  link: string;
  title: string;
  bg: string;
  buttonImg: StaticImageData;
  inactive?: boolean;
};

export function FastTravelCard({ link, title, bg, buttonImg, inactive }: IFastTravelCardProps) {

  return (
    <div className={classNames('flex flex-col justify-center mb-2 items-center', inactive ? 'opacity-75' : '')}>
      <Link
        style={{ backgroundImage: bg }}
        className={classNames('bg-center border-4 border-[#DEC58D] rounded-lg transition-all flex justify-center bg-cover p-1 h-40 lg:w-[250px]', inactive ? 'cursor-not-allowed' : 'hover:scale-105')}
        href={link}
      >
        <Image src={buttonImg} alt={title} />
      </Link>
      <h3 className='mt-2 text-center leading-4'>{title}</h3>
    </div>
  );
}

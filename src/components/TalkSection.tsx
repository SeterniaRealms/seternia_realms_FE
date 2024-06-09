"use client";
import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import profile from '@/../public/components/bonk-profile.svg';

type ITalkProps = {
    text: string,
    personName: string,
    img?: string;
};

export function TalkSection({ text, personName, img }: ITalkProps) {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(0); // Reseta a altura ao mudar o texto
        const maxHeight = 121; // Defina o valor máximo da altura conforme necessário
        const interval = setInterval(() => {
            setHeight(prevHeight => {
                if (prevHeight >= maxHeight) {
                    clearInterval(interval);
                    return prevHeight;
                }
                return prevHeight + 10; // Aumenta a altura gradualmente, ajuste conforme necessário
            });
        }, 200); // Ajuste o intervalo conforme necessário

        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className='flex items-start flex-col border-2 bg-main px-8 py-2 rounded-lg border-main mx-auto'>
            <div className='flex flex-row'>
                <div className='flex flex-col -ml-16'>
                    <div className='flex'>
                        <div className='rounded-full border-silver z-0 border-2 -mr-5 -mt-5'>
                            <Image src={profile} className='border-4 -z-[2] rounded-full border-main' width={120} height={120} alt='profile' />
                        </div>
                    </div>
                    <div className='border-2 whitespace-nowrap border-silver pr-2 pl-2 bg-brown mt-2'>
                        <span className='font-semibold text-lg'>{personName}</span>
                    </div>
                </div>
                <div className='flex items-start flex-col px-8 py-2 rounded-lg overflow-hidden' style={{ height: `${height}px` }}>
                    <p className='flex h-[120px] items-center gap-0.5 text-white font-semibold' dangerouslySetInnerHTML={{ __html: text }}>
                    </p>
                </div>
            </div>
        </div>
    );
}

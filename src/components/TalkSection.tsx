"use client";
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import profile from '@/../public/components/swordsmanprnt.png';

type ITalkProps = {
    text: string,
    personName: string,
    img?: string;
};

export function TalkSection({ text, personName, img }: ITalkProps) {

    return (
        <>
            <div className='flex items-start flex-col border-2 bg-[#DEC58D] px-8 py-2 rounded-lg border-main'>
                <div className='flex flex-row'>
                    <div className='flex flex-col -ml-16'>
                        <div className='flex'>
                            <div className='rounded-full border-silver z-0 border-2 -mr-5 -mt-5'>
                                <Image src={profile} className='border-4 -z-[2] rounded-full border-main' width={120} height={120} alt='profile' />
                            </div>
                        </div>
                        <div className='border-2 border-silver pr-2 pl-2 bg-main mt-2'>
                            <span className='font-semibold text-lg'>{personName}</span>
                        </div>
                    </div>
                    <div className='flex items-start flex-col px-8 py-2 rounded-lg'>
                        <p className='flex items-center gap-0.5 text-main font-semibold' dangerouslySetInnerHTML={{ __html: text }}>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

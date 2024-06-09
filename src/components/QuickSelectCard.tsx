"use client";
import Image from 'next/image';
import Link from 'next/link';

type IQuickSelectCardProps = {
  direction: string;
  alt: string;
  buttonImg: string;
  text: string;
  locationImage: string;
};

export function QuickSelectCard({ direction, alt, buttonImg, text, locationImage }: IQuickSelectCardProps) {
  return (
    <article className="border-gradient  hover:border-yell transition-all bg-main flex flex-col max-w-72 w-full relative">
      <div className="relative">
        <Link href={direction}>
          <Image src={locationImage} alt={alt} className="w-full" />
        </Link>
        <Link href={direction} className="absolute top-[150px] inset-0 flex justify-center items-center">
          <Image src={buttonImg} alt={alt} className="z-10" />
        </Link>
      </div>
      <Link href={direction}>
        <div className="bg-card-quick bg-main  px-4 py-10">
          <p className="text-center text-sm">
            {text}
          </p>
        </div>
      </Link>
    </article>
  );
}

import classNames from "classnames";
import Image, { StaticImageData } from "next/image";
import sol from '@/../public/components/sol-icon.svg';
import jup from '@/../public/components/jup-icon.svg';
import bonk from '@/../public/components/bonk-icon.svg';

type IFormImageBgProps = {
  name: string;
  image: StaticImageData;
  highlight?: boolean;
  imageW?: number;
  imageH?: number;
  coin?: 'sol' | 'jup' | 'bonk';
};

const coinIcons = {
  sol: sol,
  jup: jup,
  bonk: bonk
};

export function FormImageBg({
  name,
  image,
  highlight,
  imageH,
  imageW,
  coin
}: IFormImageBgProps) {
  const coinIcon = coin ? coinIcons[coin] : null;

  return (
    <>
      <article className={classNames(`bg-brown lg:w-[200px] h-[250px] transition-all p-6 flex justify-center items-center rounded-lg hover:scale-105 hover:outline outline-yell`, highlight ? 'scale-105 outline outline-yell' : '')}>
        <Image src={image} alt={name} width={imageW} height={imageH} />
      </article>
      <p className="mt-4 text-center">
        {name}
      </p>
      {coinIcon && (
        <div className="bg-brown mt-2 rounded-md  w-fit mx-auto  px-2 flex items-center justify-center gap-2">
          <Image src={coinIcon} alt={coin} width={20} height={20} />
          <p className="uppercase py-2 text-base">{coin}</p>
        </div>
      )}
    </>
  );
}

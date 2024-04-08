import classNames from "classnames";
import Image, { StaticImageData } from "next/image";

type IFormImageBgProps = {
  name: string;
  image: StaticImageData;
  cardW?: string;
  cardH?: string;
  highlight?: boolean;
  imageW?: number;
  imageH?: number;
};

export function FormImageBg(
  {
    name,
    image,
    cardW,
    cardH,
    highlight,
    imageH,
    imageW
  }:
    IFormImageBgProps
) {
  return (
    <div>
      <article className={classNames(`bg-[#DEC58D] lg:w-[200px] h-[250px] transition-all p-6 flex justify-center items-center rounded-lg hover:scale-105 hover:outline outline-amber-700`, highlight ? 'scale-105 outline outline-amber-700' : '')}>

        <Image src={image} alt={name} width={imageW} height={imageH} />

      </article>
      <p className="mt-2 text-center">
        {name}
      </p>
    </div>
  );
}

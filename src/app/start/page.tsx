"use client";
import map from "@/../public/maps/bg-main.png";
import Image from "next/image";

export default function Map() {
  return (
    <div className="relative w-full h-[680px]">
      <Image
        src={map}
        alt={"map"}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
    </div>
  );
}

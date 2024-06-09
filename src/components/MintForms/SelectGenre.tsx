"use client";

import { FormImageBg } from "../FormImageBg";
import male from '@/../public/components/male.svg';
import female from '@/../public/components/female.svg';
import { useState } from "react";
import { createNftAtom } from "@/presentation/atoms/createNftAtom";
import { useRecoilState } from "recoil";
import StepsMint from "./StepsMint";

export function SelectGenre() {
  const [selectedGenre, setSelectedGenre] = useState<string>();
  const [genrehero, setGenre] = useRecoilState(createNftAtom);

  const handleSelectGenre = (herogenre) => {
    setSelectedGenre(herogenre);
    setGenre({
      ...genrehero,
      genre: herogenre,
    })
  };



  return (
    <form className="flex justify-center lg:mx-20 flex-col items-center">
      <h2 className="text-2xl text-center">Select your genre</h2>
      <div className="flex w-full gap-2 my-5   lg:gap-8 lg:my-10 justify-between">
        <button type="button" onClick={() => handleSelectGenre("male")}>
          <FormImageBg highlight={selectedGenre == 'male'} name={"Male"} image={male} imageW={140} />
        </button>
        <button type="button"
        // onClick={() => handleSelectGenre("female")}
        >
          <FormImageBg highlight={selectedGenre == 'female'} name={"Female"} image={female} imageW={120} />
        </button>
      </div>
      {/* <StepsMint currentStep={1} /> */}
    </form>
  );
}

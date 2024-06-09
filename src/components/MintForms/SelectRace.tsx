import { FormImageBg } from "../FormImageBg";
import { useState } from "react";
import { createNftAtom } from "@/presentation/atoms/createNftAtom";
import { useRecoilState } from "recoil";
import human from '@/../public/components/humanRace.svg';
import bonk from '@/../public/components/bonkRace.svg';
import cat from '@/../public/components/catRace.svg';
import pepe from '@/../public/components/frogRace.svg';
import StepsMint from "./StepsMint";

export function SelectRace() {
  const [selectedRace, setSelectedRace] = useState<string>();
  const [heroRaceAtom, setHeroRace] = useRecoilState(createNftAtom);

  const handleSelectRace = (heroRace) => {
    setSelectedRace(heroRace);
    setHeroRace({
      ...heroRaceAtom,
      race: heroRace,
    })

  };

  return (
    <form className="flex justify-center flex-col items-center">
      <h2 className="text-2xl text-center">Select your race</h2>
      <div className="w-full my-5 gap-1  lg:gap-8 lg:my-10 grid grid-cols-2 lg:grid-cols-3">
        <button type="button"
          className="flex flex-col justify-center items-center" onClick={() => handleSelectRace("human")}>
          <FormImageBg coin="sol" highlight={selectedRace == 'human'} name={"Human"} image={human} />
        </button>
        <button type="button"
          className="flex flex-col justify-center items-center"

        // onClick={() => handleSelectRace("cat")}
        >
          <FormImageBg coin="jup" highlight={selectedRace == 'cat'} name={"Cat"} image={cat} />
        </button>
        {/* <button type="button"
         className="flex flex-col justify-center items-center"
        >
          <FormImageBg highlight={selectedRace == 'pepe'} name={"Pepe"} image={pepe} />
        </button> */}
        <button type="button"
          className="flex flex-col justify-center items-center"
          onClick={() => handleSelectRace("bonk")}
        >
          <FormImageBg coin="bonk" highlight={selectedRace == 'bonk'} name={"Dog"} image={bonk} />
        </button>
      </div>
      <StepsMint currentStep={1} />
    </form>
  );
}

import { FormImageBg } from "../FormImageBg";
import { useState } from "react";
import { createNftAtom } from "@/presentation/atoms/createNftAtom";
import { useRecoilState } from "recoil";
import flame from '@/../public/components/flameFac.svg';
import twilight from '@/../public/components/twilightFac.svg';
import arcane from '@/../public/components/arcaneFac.svg';
import light from '@/../public/components/lightFac.svg';
import StepsMint from "./StepsMint";

export function SelectFaction() {
  const [selectedFaction, setSelectedFaction] = useState<string>();
  const [heroRace, setHeroFaction] = useRecoilState(createNftAtom);

  const handleSelectFac = (herofaction) => {
    setSelectedFaction(herofaction);
    setHeroFaction({
      ...heroRace,
      faction: herofaction
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (heroRace.genre == undefined || heroRace.class == undefined || heroRace.race == undefined || heroRace.faction == undefined) {
      console.error('Select all of the previews options')
    } else {
      console.log(heroRace)

    }
  }

  return (
    <form className="flex justify-center flex-col items-center" onSubmit={handleSubmit}>
      <h2 className="text-2xl text-center">Select your faction</h2>
      <div className="w-full my-5 gap-1  lg:gap-8 lg:my-10 grid grid-cols-2 lg:grid-cols-4">
        <button type="button" onClick={() => handleSelectFac("flame")}>
          <FormImageBg highlight={selectedFaction == 'flame'} name={"Silver Flame"} image={flame} />
        </button>
        <button type="button" onClick={() => handleSelectFac("light")}>
          <FormImageBg highlight={selectedFaction == 'light'} name={"Order of Light"} image={light} />
        </button>
        <button type="button" onClick={() => handleSelectFac("arcane")}>
          <FormImageBg highlight={selectedFaction == 'arcane'} name={"Arcane Circle"} image={arcane} />
        </button>
        <button type="button" onClick={() => handleSelectFac("twilight")}>
          <FormImageBg highlight={selectedFaction == 'twilight'} name={"Twilight Brotherhood"} image={twilight} />
        </button>
      </div>
      <StepsMint currentStep={3} />
    </form>
  );
}

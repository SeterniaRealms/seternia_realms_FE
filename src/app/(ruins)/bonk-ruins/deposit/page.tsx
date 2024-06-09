"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { BaseModal } from "@/components/BaseModal";
import { SelectClass } from "@/components/MintForms/SelectClass";
import { SelectRace } from "@/components/MintForms/SelectRace";
import { SelectFaction } from "@/components/MintForms/SelectFaction";
import { createNftAtom } from "@/presentation/atoms/createNftAtom";
import { useRecoilState } from "recoil";
import { TrainingCamp } from "@/components/MintForms/TrainingCamp";
import { TalkModal } from "@/components/TalkModal";
import { TalkSection } from "@/components/TalkSection";
import { BonkRunesIntern } from "@/components/BonkRuins/BonkRunesIntern";

export default function Bonk() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(pathname.includes("/bonk-ruins"));
  }, [pathname]);

  const handleClose = () => {
    router.push('/start');
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return <BonkRunesIntern />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <BaseModal isOpen={isOpen} onClose={handleClose}>
        {renderForm()}
      </BaseModal>
      <section id="talk" className="mt-4 lg:max-w-[55%]">
        <TalkModal bgColor={"bg-transparent"} border={false} isOpen={isOpen} onClose={handleClose}>
          <TalkSection personName={"BONK GUARD"} text={"BONK Guard: Welcome, brave adventurers, to the entrance of the legendary BONK RUINS! Venture boldly into these depths, and who knows, you may emerge with treasures beyond imagination! But remember, the journey will be arduous and the dangers are many. Are you ready to face the unknown and return as true heroes?"} />
        </TalkModal>
      </section>
    </div>
  );
}
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

export default function TrainingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(pathname.includes("/training"));
  }, [pathname]);

  const handleClose = () => {
    router.push('/start');
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return <TrainingCamp />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <BaseModal isOpen={isOpen} onClose={handleClose}>
        {renderForm()}
      </BaseModal>
      <section id="talk" className="mt-4">
        <TalkModal bgColor={"bg-transparent"} border={false} isOpen={isOpen} onClose={handleClose}>
          <TalkSection personName={"Master Warrior"} text={"Hello brave adventurer! Are you ready to begin the training? <br />If you're willing to train, you'll receive an amount of GOLD as a reward!</p>"} />
        </TalkModal>
      </section>
    </div>
  );
}
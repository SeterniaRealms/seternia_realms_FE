"use client";
import { useRecoilState } from "recoil";
import Image from "next/image";
import classNames from "classnames";
import closeButton from "@/../public/components/closeModal.svg";
import { QuickSelectCard } from "./QuickSelectCard";
import { Pages } from "@/presentation/enums/pages";
import { quickSelectAtom } from "@/presentation/atoms/quickSelectAtom";
import { cardsData } from "@/presentation/data/quickSelectCards";
import { useEffect, useRef } from "react";

export function QuickSelectModal() {
  const [modalState, setModalState] = useRecoilState(quickSelectAtom);
  const modalRef = useRef(null);

  function onClose() {
    setModalState({ open: false });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div
      className={classNames(
        "fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity",
        { hidden: !modalState.open }
      )}
    >
      <div ref={modalRef} className="rounded-lg w-full max-w-5xl max-h-full overflow-y-auto">
        <header className="flex justify-end pb-5">
          <button type="button" onClick={onClose} aria-label="Close modal">
            <Image width={30} src={closeButton} alt="Close modal button" />
          </button>
        </header>
        <main className="grid sm:grid-cols-2 gap-2 justify-items-center justify-center lg:gap-9 lg:grid-cols-3">
          {cardsData.map((item) => (
            <QuickSelectCard
              key={item.alt}
              direction={item.direction}
              alt={item.alt}
              buttonImg={item.buttonImg}
              text={item.text}
              locationImage={item.locationImage}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

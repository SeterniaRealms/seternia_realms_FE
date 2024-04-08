import { atom } from "recoil";

export type CreateNftAtomProps = {
  genre?: string;
  class?: string;
  race?: string;
  faction?: string;
};

export const createNftAtom = atom<CreateNftAtomProps>({
  key: "createNftAtom",
  default: {
  },
});

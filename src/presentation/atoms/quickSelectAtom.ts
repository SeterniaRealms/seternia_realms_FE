import { atom } from "recoil";

export type QuickSelectAtomProps = {
  open: boolean;
};

export const quickSelectAtom = atom<QuickSelectAtomProps>({
  key: "quickSelectAtom",
  default:{
    open: false
  }
});

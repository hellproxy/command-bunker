import { produce } from "immer";
import { create } from "zustand";

interface DisplayableInfo {
  title: string;
  text: string;
}

interface InfoState {
  info?: DisplayableInfo;
}

interface InfoHooks {
  setInfo: (info: DisplayableInfo) => void;
  clearInfo: () => void;
}

export const useInfoStore = create<InfoState & InfoHooks>()((set) => ({
  setInfo: (info) =>
    set(
      produce((state) => {
        state.info = info;
      })
    ),
  clearInfo: () =>
    set(
      produce((state) => {
        state.info = undefined;
      })
    ),
}));

import { useReferenceData } from "@/hooks/reference";
import { produce } from "immer";
import { create } from "zustand";

interface InfoState {
  info?: string;
}

interface InfoHooks {
  setInfo: (info: string) => void;
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

export const useInfo = () => {
  const refernceData = useReferenceData();
  const type = useInfoStore((state) => state.info);

  return type ? refernceData.get(type) : undefined;
};

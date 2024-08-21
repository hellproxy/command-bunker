import {
  useEnhancementData,
  useRitualData,
  useSorceryData,
  useStratagemData,
} from "./codex-data";
import { useMemo } from "react";

interface Info {
  name: string;
  text: string;
}

export const useReferenceData = () => {
  const { data: ritualData } = useRitualData();
  const { data: stratagemData } = useStratagemData();
  const { data: sorceriesData } = useSorceryData();
  const { data: enhancementData } = useEnhancementData();

  const allData = [ritualData, stratagemData, sorceriesData, enhancementData];
  const generate = !allData.includes(undefined);

  const lookup: Map<string, Info> = useMemo(
    () =>
      generate
        ? new Map([
            ...ritualData!,
            ...stratagemData!,
            ...sorceriesData!,
            ...enhancementData!,
          ])
        : new Map(),
    [generate]
  );

  return lookup;
};

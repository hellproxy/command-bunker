import { parse } from "yaml";
import useSWR from "swr";

interface RitualFile {
  rituals: Immutable.Ritual[];
}

export const useRitualData = () => {
  return useSWR("rituals", () => fetchRituals().then(index), {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });
};

const fetchRituals = async (): Promise<RitualFile> => {
  const response = await fetch("/rituals.yaml");
  const text = await response.text();
  return parse(text);
};

const index = (file: RitualFile): Map<string, Immutable.Ritual> => {
  return file.rituals.reduce((map, ritual) => {
    map.set(ritual.type, ritual);
    return map;
  }, new Map<string, Immutable.Ritual>());
};

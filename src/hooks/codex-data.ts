import useSWR from "swr";
import { parse } from "yaml";

interface Typed {
  type: string;
}

const index = <T extends Typed>(values: T[]): Map<string, T> => {
  return values.reduce((map, value) => {
    map.set(value.type, value);
    return map;
  }, new Map<string, T>());
};

const fetchYaml = async <T>(name: string): Promise<T> => {
  const response = await fetch(name);
  const text = await response.text();
  return parse(text);
};

const swrOptions = () => ({
  revalidateOnReconnect: false,
  revalidateOnFocus: false,
});

interface RitualFile {
  rituals: Immutable.Ritual[];
}

export const useRitualData = () => {
  const file = "/rituals.yaml";
  return useSWR(
    "rituals",
    () => fetchYaml<RitualFile>(file).then((file) => index(file.rituals)),
    swrOptions()
  );
};

interface SorceryFile {
  sorceries: Immutable.Sorcery[];
}

export const useSorceryData = () => {
  const file = "/sorceries.yaml";
  return useSWR(
    "kindered-sorceries",
    () => fetchYaml<SorceryFile>(file).then((file) => index(file.sorceries)),
    swrOptions()
  );
};

interface StratagemFile {
  stratagems: Immutable.Stratagem[];
}

export const useStratagemData = () => {
  const file = "/stratagems.yaml";
  return useSWR(
    "stratagems",
    () => fetchYaml<StratagemFile>(file).then((file) => index(file.stratagems)),
    swrOptions()
  );
};

interface EnhancementFile {
  enhancements: Immutable.Enhancement[];
}

export const useEnhancementData = () => {
  const file = "/enhancements.yaml";
  return useSWR(
    "enhancements",
    () =>
      fetchYaml<EnhancementFile>(file).then((file) => index(file.enhancements)),
    swrOptions()
  );
};

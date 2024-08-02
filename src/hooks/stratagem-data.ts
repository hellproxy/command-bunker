import { parse } from "yaml";
import useSWR from "swr";

interface StratagemFile {
  stratagems: Immutable.Stratagem[];
}

export const useStratagemData = () => {
  return useSWR("stratagems", () => fetchStratagems().then(index), {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });
};

const fetchStratagems = async (): Promise<StratagemFile> => {
  const response = await fetch("/stratagems.yaml");
  const text = await response.text();
  return parse(text);
};

const index = (file: StratagemFile): Map<string, Immutable.Stratagem> => {
  return file.stratagems.reduce((map, stratagem) => {
    map.set(stratagem.type, stratagem);
    return map;
  }, new Map<string, Immutable.Stratagem>());
};

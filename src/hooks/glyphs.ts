import { parse } from "yaml";
import useSWR from "swr";
import { useUnitData } from "./unit-data";
import Prando from "prando";

interface Glyphs {
  glyphs: Glyph[];
}

interface Glyph {
  index: number;
  adjustment?: number;
}

interface GlyphResponse {
  glyphs?: Map<string, Glyph>;
  isLoading: boolean;
}

export const useGlyphs = (): GlyphResponse => {
  const { data: glyphData, isLoading: glyphsLoading } = useGetGlyphs();
  const { data: unitData, isLoading: unitsLoading } = useUnitData();

  if (glyphsLoading || unitsLoading) {
    return { glyphs: undefined, isLoading: true };
  } else if (!glyphData || !unitData) {
    return { glyphs: undefined, isLoading: false };
  }

  if (cachedResponse.glyphs !== undefined) return { ...cachedResponse };

  const uniqueNames = new Set<string>();
  Array.from(unitData.indexedWeapons)
    .map(([, weapon]) => weapon.name)
    .forEach((name) => uniqueNames.add(name));
  Array.from(unitData.indexedAbilities)
    .map(([, ability]) => ability.name)
    .forEach((name) => uniqueNames.add(name));
  const orderedNames = Array.from(uniqueNames);

  const glyphs = glyphData.glyphs;

  const rng = new Prando(123);
  const sortedGlyphs = glyphs
    .map((glyph) => ({ glyph, sort: rng.next(0, Number.MAX_SAFE_INTEGER) }))
    .sort((a, b) => a.sort - b.sort);

  const pairedGlyphs: [string, Glyph][] = orderedNames.map((name, index) => [
    name,
    sortedGlyphs[index % glyphs.length].glyph,
  ]);

  cachedResponse.glyphs = new Map(pairedGlyphs);

  return { ...cachedResponse };
};

const useGetGlyphs = () => {
  return useSWR("glyphs", fetchGlyphs, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });
};

const fetchGlyphs = async (): Promise<Glyphs> => {
  const response = await fetch("/glyphs.yaml");
  const text = await response.text();
  return parse(text);
};

const cachedResponse: GlyphResponse = { isLoading: false };

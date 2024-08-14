import { useListStore } from "@/stores/lists";
import { useEnhancementData } from "./codex-data";

export const useEnhancements = (listId: string) => {
  const lookup = useListStore((state) => extract(state)(listId));
  const { data } = useEnhancementData();

  // reverse array
  const allocation = new Map(
    Array.from(lookup, ([unitId, type]) => [type, unitId])
  );

  return { enhancements: data, allocation };
};

export const useEnhancement = (listId: string, unitId: string) => {
  const type = useListStore((state) => extract(state)(listId).get(unitId));
  const { data } = useEnhancementData();

  return type ? data?.get(type) : undefined;
};

function extract(state: { lists: Map<string, ListBuilder.List> }) {
  return function (listId: string) {
    return state.lists.get(listId)?.enhancements || empty();
  };
}

function empty() {
  return new Map<string, Immutable.EnhancementType>();
}

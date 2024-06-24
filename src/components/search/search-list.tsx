import { useListStore } from "@/stores/lists";
import { AbilityInfo } from "./ability-info";
import { UnitInfo } from "./unit-info";
import { WeaponInfo } from "./weapon-info";
import { SearchValue, useSearch } from "@/hooks/search";

interface SearchListProps {
  listId: string;
  searchString: string;
}

export const SearchList = ({ listId, searchString }: SearchListProps) => {
  const list = useListStore((state) => state.getList(listId));
  const { searchEngine, searchError } = useSearch();

  if (searchError) return <div>Failed to load</div>;
  if (!searchEngine || !list) return <div>Loading...</div>;

  const searchResults = searchEngine.search(searchString);

  return (
    <>
      <div className="flex flex-col gap-2">
        {searchResults.map((result) => (
          <SearchItem key={result.item.value.type} searchValue={result.item} />
        ))}
      </div>
    </>
  );
};

interface SearchValueProps {
  searchValue: SearchValue;
}

const SearchItem = ({ searchValue }: SearchValueProps) => {
  switch (searchValue.model) {
    case "unit":
      return <UnitInfo unit={searchValue.value} />;
    case "weapon":
      return (
        <WeaponInfo
          weapon={searchValue.value}
          unitName={searchValue.unitName}
        />
      );
    case "ability":
      return (
        <AbilityInfo
          ability={searchValue.value}
          unitName={searchValue.unitName}
        />
      );
  }
};

import { useGetList } from "@/stores/lists";
import { SearchAbility } from "./search-ability";
import { SearchUnit } from "./search-unit";
import { SearchWeapon } from "./search-weapon";
import { SearchValue, useSearch } from "@/hooks/search";
import { useGameStore } from "@/stores/game";

interface SearchListProps {
  searchString: string;
}

export const SearchList = ({ searchString }: SearchListProps) => {
  const listId = useGameStore((state) => state.listId!);
  const list = useGetList(listId);
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
      return <SearchUnit unit={searchValue.value} />;
    case "weapon":
      return (
        <SearchWeapon
          weapon={searchValue.value}
          unitName={searchValue.unitName}
        />
      );
    case "ability":
      return (
        <SearchAbility
          ability={searchValue.value}
          unitName={searchValue.unitName}
        />
      );
  }
};

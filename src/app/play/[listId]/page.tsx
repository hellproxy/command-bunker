"use client";

import { SectionHeader } from "@/components/section-header";
import { useState } from "react";
import { Search } from "lucide-react";
import { useListStore } from "@/stores/lists";
import { SearchValue, useSearch } from "@/hooks/search";
import { StatLine } from "@/components/statline";
import { UnitInfo } from "@/components/unit-info";
import { WeaponInfo } from "@/components/weapon-info";
import { AbilityInfo } from "@/components/ability-info";

interface CommandBunkerProps {
  params: ListId;
}

interface ListId {
  listId: string;
}

interface SearchString {
  searchString: string;
}

interface SearchResult {
  searchValue: SearchValue;
}

export default function CommandBunker({
  params: { listId },
}: CommandBunkerProps) {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex flex-col gap-2 pl-1 pr-2 py-2 max-h-full overflow-auto"></div>
      <div className="flex flex-col gap-2 pl-1 pr-2 py-2 max-h-full overflow-auto">
        <ReferencePane listId={listId} />
      </div>
    </div>
  );
}

const ReferencePane = ({ listId }: ListId) => {
  const [searchString, setSearchString] = useState("");

  return (
    <>
      <div className="flex flex-row items-center p-3 gap-3 rounded bg-white search">
        <Search size={20} />
        <input
          className="grow focus-visible:outline-none"
          placeholder="Search..."
          value={searchString}
          onChange={(event) => setSearchString(event.target.value)}
        />
      </div>
      {!searchString ? (
        <FullReferenceList listId={listId} />
      ) : (
        <FilteredReferenceList listId={listId} searchString={searchString} />
      )}
    </>
  );
};

const FullReferenceList = ({ listId }: ListId) => {
  return (
    <>
      <SectionHeader>Characters</SectionHeader>
      <SectionHeader>Infantry</SectionHeader>
      <SectionHeader>Non-Infantry</SectionHeader>
      <SectionHeader>Allies</SectionHeader>
    </>
  );
};

const FilteredReferenceList = ({
  listId,
  searchString,
}: ListId & SearchString) => {
  const list = useListStore((state) => state.getList(listId));
  const { searchEngine, searchError } = useSearch();

  if (searchError) return <div>Failed to load</div>;
  if (!searchEngine || !list) return <div>Loading...</div>;

  const searchResults = searchEngine.search(searchString);

  return (
    <>
      <div className="flex flex-col gap-2">
        {searchResults.map((result) => (
          <FilteredReferenceValue
            key={result.item.value.type}
            searchValue={result.item}
          />
        ))}
      </div>
    </>
  );
};

const FilteredReferenceValue = ({ searchValue }: SearchResult) => {
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

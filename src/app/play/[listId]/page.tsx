"use client";

import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { SearchList } from "@/components/search/search-list";
import { ArmyList } from "@/components/army/army-list";
import { useHotkey } from "@/hooks/hotkey";

interface CommandBunkerProps {
  params: {
    listId: string;
  };
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

interface ReferencePaneProps {
  listId: string;
}

const ReferencePane = ({ listId }: ReferencePaneProps) => {
  const [searchString, setSearchString] = useState("");

  const ref = useRef<HTMLInputElement | null>(null);
  useHotkey((event) => {
    if (event.key === "Escape") {
      setSearchString("");
    } else {
      ref.current?.focus();
    }
  });

  return (
    <>
      <div className="flex flex-row items-center p-3 gap-3 rounded bg-white search">
        <Search size={20} />
        <input
          className="grow focus-visible:outline-none"
          placeholder="Search..."
          value={searchString}
          onChange={(event) => setSearchString(event.target.value)}
          ref={ref}
        />
      </div>
      {!searchString ? (
        <ArmyList listId={listId} />
      ) : (
        <SearchList listId={listId} searchString={searchString} />
      )}
    </>
  );
};

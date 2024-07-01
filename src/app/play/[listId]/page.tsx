"use client";

import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { SearchList } from "@/components/search/search-list";
import { ArmyList } from "@/components/army/army-list";
import { useHotkey } from "@/hooks/hotkey";
import { CabalPoints } from "@/components/points/cabal-points";

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
      <div className="flex flex-col gap-2 pl-1 pr-2 py-2 max-h-full overflow-auto">
        <GameStatePane listId={listId} />
      </div>
      <div className="flex flex-col gap-2 pl-1 pr-2 py-2 max-h-full overflow-auto">
        <ReferencePane listId={listId} />
      </div>
    </div>
  );
}

interface GameStatePaneProps {
  listId: string;
}

const GameStatePane = ({ listId }: GameStatePaneProps) => {
  return (
    <div className="grid grid-cols-3 p-2 bg-white rounded shadow-md">
      <div className="flex flex-col">
        <div className="text-sm text-center">Command Points</div>
        <div className="text-center">0</div>
      </div>
      <div>
        <div className="text-sm text-center">Cabal Points</div>
        <div className="flex justify-center">
          <CabalPoints listId={listId} />
        </div>
      </div>
      <div>
        <div className="text-sm text-center">Victory Points</div>
        <div className="flex justify-center">0</div>
      </div>
    </div>
  );
};

interface ReferencePaneProps {
  listId: string;
}

const ReferencePane = ({ listId }: ReferencePaneProps) => {
  const [searchString, setSearchString] = useState("");

  const ref = useRef<HTMLInputElement | null>(null);
  useHotkey(({ key }) => {
    if (key === "Escape") {
      setSearchString("");
    } else if (key.match(/^[a-zA-Z]$/)) {
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

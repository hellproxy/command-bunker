"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { SearchList } from "@/components/search/search-list";
import { ArmyList } from "@/components/army/army-list";
import { useHotkey } from "@/hooks/hotkey";
import { CabalPoints } from "@/components/state/cabal-points";
import { CommandPoints } from "@/components/state/command-points";
import { Turn } from "@/components/state/turn";
import { VictoryPoints } from "@/components/state/victory-points";
import { UndoRedo } from "@/components/state/undo-redo";

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
    <div className="flex divide-x bg-white rounded shadow-md">
      <div className="grow grid grid-cols-4 divide-x">
        <div className="flex flex-col gap-1 py-2">
          <div className="text-sm text-center">Turn</div>
          <div className="flex justify-center">
            <Turn />
          </div>
        </div>
        <div className="flex flex-col gap-1 py-2">
          <div className="text-sm text-center">Victory</div>
          <div className="flex justify-center">
            <VictoryPoints />
          </div>
        </div>
        <div className="flex flex-col gap-1 py-2">
          <div className="text-sm text-center">Command</div>
          <div className="flex justify-center">
            <CommandPoints />
          </div>
        </div>
        <div className="flex flex-col gap-1 py-2">
          <div className="text-sm text-center">Cabal</div>
          <div className="flex justify-center">
            <CabalPoints listId={listId} />
          </div>
        </div>
      </div>
      <UndoRedo />
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

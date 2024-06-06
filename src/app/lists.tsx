"use client";

import { useRef, useState } from "react";
import { useListStore } from "../stores/lists";
import { useOnClickOutside } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { Edit2, Play, Plus, Trash2, X } from "react-feather";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export const Lists = () => {
  const lists = useListStore((state) => state.lists);
  const addList = useListStore((state) => state.addList);

  return (
    <div className="flex flex-col space-y-2">
      {lists.map((list) => (
        <ListEntry listId={list.listId} key={list.listId} />
      ))}
      <div className="grid justify-items-center p-2 min-h-20">
        <button className="btn btn-green self-center" onClick={addList}>
          <Plus />
        </button>
      </div>
    </div>
  );
};

const ListEntry = ({ listId }: { listId: string }) => {
  return (
    <div className="flex flex-row items-center space-x-4 py-2 px-4 min-h-20 bg-white shadow-md rounded">
      <NameEditor listId={listId} />
      <Buttons listId={listId} />
    </div>
  );
};

const NameEditor = ({ listId }: { listId: string }) => {
  const name = useListStore((state) => state.getList(listId).name);
  const setName = useListStore((state) => state.setName(listId));

  const [editing, setEditing] = useState(false);

  const startEdit = () => setTimeout(() => setEditing(true), 100);
  const endEdit = () => setTimeout(() => setEditing(false), 200);

  const ref = useRef(null);
  useOnClickOutside(ref, endEdit);

  const focusRing = editing ? "ring-2 focus-visible:ring-2" : "";
  return (
    <div className="grow-wrap">
      <textarea
        className={`hover:ring hover:ring-1 ring-offset-2 focus-visible:outline-none ${focusRing}`}
        ref={ref}
        readOnly={!editing}
        value={name}
        placeholder="Give your list a name"
        onClick={startEdit}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && endEdit()}
      />
    </div>
  );
};

const Buttons = ({ listId }: { listId: string }) => {
  return (
    <div className="flex flex-row items-center space-x-1 min-w-44">
      <Builder listId={listId} />
      <Bunker listId={listId} />
      <Delete listId={listId} />
    </div>
  );
};

const Builder = ({ listId }: { listId: string }) => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    router.push(`/list-builder/${listId}`);
  };

  return (
    <button className="btn btn-blue" onClick={handleClick}>
      <Edit2 />
    </button>
  );
};

const Bunker = ({ listId }: { listId: string }) => {
  return (
    <button className="btn btn-green">
      <Play />
    </button>
  );
};

const remove = "remove";

const Delete = ({ listId }: { listId: string }) => {
  const removeList = useListStore((state) => state.removeList(listId));

  const [removing, setRemoving] = useState<string | null>(null);

  const startRemove = () => {
    const removeKey = uuidv4();
    setRemoving(removeKey);
    setTimeout(
      () => setRemoving((key) => (key === removeKey ? remove : key)),
      2000
    );
  };
  const endRemove = () => setTimeout(() => setRemoving(null), 200);

  return removing !== null ? (
    <div className="inline-flex">
      <button
        className="btn btn-red rounded-none rounded-l"
        onClick={removeList}
        disabled={removing != remove}
      >
        <Trash2 />
      </button>
      <button
        className="btn btn-gray rounded-none rounded-r"
        onClick={endRemove}
      >
        <X />
      </button>
    </div>
  ) : (
    <button className="btn btn-red" onClick={startRemove}>
      <Trash2 />
    </button>
  );
};

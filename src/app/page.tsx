"use client";

import { useListStore } from "../stores/lists";
import { Lists } from "./lists";

export default function Home() {
  const lists = useListStore((state) => state.lists);
  const addList = useListStore((state) => state.addList);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Lists />
    </main>
  );
}

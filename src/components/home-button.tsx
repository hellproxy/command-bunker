"use client";

import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { MouseEvent } from "react";

export const HomeButton = () => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    router.push("/");
  };

  return (
    <button
      className="w-full p-4 bg-slate-600 hover:bg-slate-500"
      onClick={handleClick}
    >
      <Home />
    </button>
  );
};

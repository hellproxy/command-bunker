import { useGameStore, useNavigation } from "@/stores/game";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const UndoRedo = () => {
  const { canGoBack, canGoForward } = useNavigation();
  const back = useGameStore((state) => state.back);
  const forward = useGameStore((state) => state.forward);

  return (
    <div className="flex flex-col divide-y">
      <button
        className="grow p-1 rounded-tr
        enabled:text-gray-500 enabled:hover:bg-gray-100 enabled:focus:ring-2 enabled:focus:ring-blue-400 enabled:focus:z-10
        disabled:text-gray-300 disabled:bg-gray-100"
        disabled={!canGoForward}
        onClick={forward}
      >
        <ArrowRight strokeWidth={1.5} />
      </button>
      <button
        className="grow p-1 rounded-br
        enabled:text-gray-500 enabled:hover:bg-gray-100 enabled:focus:ring-2 enabled:focus:ring-blue-400 enabled:focus:z-10
        disabled:text-gray-300 disabled:bg-gray-100"
        disabled={!canGoBack}
        onClick={back}
      >
        <ArrowLeft strokeWidth={1.5} />
      </button>
    </div>
  );
};

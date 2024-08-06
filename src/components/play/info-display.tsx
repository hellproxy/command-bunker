import { useInfoStore } from "@/stores/info";
import { X } from "lucide-react";

export const InfoDisplay = () => {
  const [info, clear] = useInfoStore((state) => [state.info, state.clearInfo]);

  return (
    <div className="flex bg-white rounded shadow-md px-2 py-4 overflow-hidden">
      {info ? (
        <div className="flex flex-col gap-2 px-3 overflow-auto">
          <div className="flex flex-row items-center">
            <div className="mr-auto">{info.title}</div>
            <button className="btn btn-gray p-0.5" onClick={clear}>
              <X size={16} />
            </button>
          </div>
          <div className="text-sm text-justify">{info.text}</div>
        </div>
      ) : (
        <div className="text-gray-400 px-3">
          Click any <span className="font-bold">bold text</span> to view more
          info here
        </div>
      )}
    </div>
  );
};

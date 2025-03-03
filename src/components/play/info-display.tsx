import { useInfo, useInfoStore } from "@/stores/info";
import { X } from "lucide-react";
import Markdown from "react-markdown";

export const InfoDisplay = () => {
  const info = useInfo();
  const clear = useInfoStore((state) => state.clearInfo);

  return (
    <div className="flex bg-white rounded shadow-md px-2 py-4 overflow-hidden">
      {info ? (
        <div className="flex flex-col gap-2 px-3 overflow-auto grow">
          <div className="flex flex-row items-center">
            <div className="mr-auto">{info.name}</div>
            <button className="btn btn-gray p-0.5" onClick={clear}>
              <X size={16} />
            </button>
          </div>
          <div className="text-sm markdown">
            <Markdown>{info.text}</Markdown>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 px-3 markdown">
          <Markdown>Click any **bold text** to view more info here</Markdown>
        </div>
      )}
    </div>
  );
};

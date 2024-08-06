import { useInfoStore } from "@/stores/info";

export const InfoDisplay = () => {
  const info = useInfoStore((state) => state.info);

  return (
    <div className="flex bg-white rounded shadow-md px-4 py-4 overflow-hidden">
      {info && (
        <div className="flex flex-col gap-2 px-1 overflow-auto">
          <div>{info.title}</div>
          <div className="text-sm">{info.text}</div>
        </div>
      )}
    </div>
  );
};

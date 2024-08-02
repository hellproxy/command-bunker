import { PropsWithChildren } from "react";

type PhaseProps = PropsWithChildren<{
  name: string;
}>;

export const Phase = ({ children, name }: PhaseProps) => {
  return (
    <div className="flex flex-col divide-y bg-white rounded shadow-md px-4 py-2">
      <div className="text-lg px-2 pb-1">{name}</div>
      <div>{children}</div>
    </div>
  );
};

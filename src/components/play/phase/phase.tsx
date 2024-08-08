import { ArrowBigRight, Crown } from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";

type PhaseProps = PropsWithChildren<{
  name: string;
  icon: ReactNode;
}>;

export const Phase = ({ children, name, icon }: PhaseProps) => {
  return (
    <div className="flex flex-col divide-y bg-white rounded shadow-md px-4 py-2">
      <div className="flex flex-inline-row items-center text-lg px-2 pb-1">
        <div className="flex min-w-8">{icon}</div>
        {name}
      </div>
      <div>{children}</div>
    </div>
  );
};

import { PropsWithChildren } from "react";

type SectionHeaderProps = PropsWithChildren<{
  hidden?: boolean;
}>;

export const SectionHeader = ({ children, hidden }: SectionHeaderProps) => {
  return (
    !hidden && (
      <div className="px-4 py-3 bg-slate-700 text-white text-lg">
        {children}
      </div>
    )
  );
};

import { MouseEventHandler, PropsWithChildren } from "react";

type ToggleProps = PropsWithChildren<{
  name?: string;
  position?: "before" | "after";
  checked?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
}>;

export const Toggle = ({
  children,
  name,
  position,
  checked,
  onClick,
}: ToggleProps) => {
  const direction = position === "before" ? "flex-row" : "flex-row-reverse";

  return (
    <label
      className={`grow flex inline-flex items-center cursor-pointer gap-2 ${direction}`}
    >
      <input
        type="checkbox"
        name={name}
        value=""
        className="sr-only peer"
        checked={checked}
        readOnly={true}
        onClick={onClick}
      />
      <div
        className="
            relative w-9 h-5 bg-gray-200 rounded-full shrink-0
            peer
            peer-focus:ring-2 peer-focus:ring-blue-300
            peer-checked:after:translate-x-full
            rtl:peer-checked:after:-translate-x-full
            peer-checked:after:border-white
            after:content-['']
            after:absolute
            after:top-[2px]
            after:start-[2px]
            after:bg-white
            after:border-gray-300
            after:border
            after:rounded-full
            after:h-4
            after:w-4
            after:transition-all
            peer-checked:bg-blue-600"
      />
      <div className="grow text-sm font-medium select-none">{children}</div>
    </label>
  );
};

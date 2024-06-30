import { UnitStatus, useGameStore } from "@/stores/game";
import { ArrowBigUp, Settings2, Skull } from "lucide-react";
import { PropsWithChildren, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useShallow } from "zustand/react/shallow";

interface UnitStatusTogglesProps {
  unitId: string;
}

export const UnitStatusToggles = ({ unitId }: UnitStatusTogglesProps) => {
  const status = useGameStore((state) => state.unitStatuses.get(unitId));
  const [showToggles, setShowToggles] = useState(false);

  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowToggles(false));

  return (
    <div className="flex" ref={ref}>
      {showToggles && (
        <div className="relative">
          <div className="absolute h-full right-0 flex items-center">
            <div className="p-2 bg-white mr-2 p-2 rounded border shadow-md text-sm">
              <fieldset className="flex flex-col gap-2">
                <UnitStatusToggle unitId={unitId} status={status} target="dead">
                  Dead
                </UnitStatusToggle>
                <UnitStatusToggle
                  unitId={unitId}
                  status={status}
                  target="reserve"
                >
                  In Reserve
                </UnitStatusToggle>
              </fieldset>
            </div>
          </div>
        </div>
      )}
      <button
        className="btn btn-gray p-1 rounded"
        onClick={() => setShowToggles((show) => !show)}
      >
        <UnitStatusIcon status={status} />
      </button>
    </div>
  );
};

type UnitStatusToggleProps = PropsWithChildren<{
  unitId: string;
  status: UnitStatus;
  target: UnitStatus;
}>;

const UnitStatusToggle = ({
  children,
  unitId,
  status,
  target,
}: UnitStatusToggleProps) => {
  const toggleStatus = useGameStore((state) => state.toggleStatus);

  const groupName = `toggles-${unitId}`;

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        name={groupName}
        value=""
        className="sr-only peer"
        checked={status === target}
        readOnly={true}
        onClick={() => toggleStatus(unitId, target)}
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
      <span className="ms-3 text-sm font-medium whitespace-nowrap select-none">
        {children}
      </span>
    </label>
  );
};

interface UnitStatusIconProps {
  status: UnitStatus;
}

const UnitStatusIcon = ({ status }: UnitStatusIconProps) => {
  switch (status) {
    case undefined:
      return <Settings2 size={16} />;
    case "dead":
      return <Skull size={16} />;
    case "reserve":
      return <ArrowBigUp size={16} />;
  }
};

import { UnitStatus, useGameStore, useGameValues } from "@/stores/game";
import { ArrowBigUp, Settings2, Skull } from "lucide-react";
import { PropsWithChildren, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useShallow } from "zustand/react/shallow";
import { Toggle } from "./toggle";

interface UnitStatusTogglesProps {
  unitId: string;
}

export const UnitStatusToggles = ({ unitId }: UnitStatusTogglesProps) => {
  const status = useGameValues(({ unitStatuses }) => unitStatuses.get(unitId));
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
                <UnitStatusToggle
                  text="Dead"
                  unitId={unitId}
                  status={status}
                  target="dead"
                />
                <UnitStatusToggle
                  text="In Reserve"
                  unitId={unitId}
                  status={status}
                  target="reserve"
                />
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

interface UnitStatusToggleProps {
  text: string;
  unitId: string;
  status: UnitStatus;
  target: UnitStatus;
}

const UnitStatusToggle = ({
  text,
  unitId,
  status,
  target,
}: UnitStatusToggleProps) => {
  const toggleStatus = useGameStore((state) => state.toggleStatus);

  const groupName = `toggles-${unitId}`;

  return (
    <Toggle
      position="before"
      name={groupName}
      checked={status === target}
      onClick={() => toggleStatus(unitId, target)}
    >
      <div className="whitespace-nowrap">{text}</div>
    </Toggle>
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

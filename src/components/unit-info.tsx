import { StatLine } from "./statline";
import { UnitIcon } from "./unit-icon";

interface UnitInfoProps {
  unit: Immutable.Unit;
}

export const UnitInfo = ({ unit }: UnitInfoProps) => {
  return (
    <div className="grid grid-cols-12 items-center px-4 py-4 gap-4 bg-white rounded-lg shadow-md">
      <div className="flex col-span-2 justify-center h-full overflow-hidden">
        <UnitIcon src={unit.image} alt={unit.name} />
      </div>
      <div className="col-span-10">
        <div className="text-lg mb-2">{unit.name}</div>
        <StatLine data={unit.statLine} />
      </div>
    </div>
  );
};

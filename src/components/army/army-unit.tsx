import { useUnitData } from "@/hooks/data";
import { UnitIcon } from "../unit-icon";
import { StatLine } from "../statline";
import { Tags } from "../tags";

interface ArmyUnitProps {
  unit: ListBuilder.Unit;
  unitData: Immutable.Unit;
}

export const ArmyUnit = ({ unit, unitData }: ArmyUnitProps) => {
  const { options } = unit;
  const { data, error } = useUnitData();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { name, image, statLine } = unitData;

  const selectedTypes = Array.from(options)
    .flatMap(([location, optionMap]) =>
      Array.from(optionMap).map(([type, selected]) => ({
        location,
        type,
        selected,
      }))
    )
    .filter(({ selected }) => selected)
    .map(
      ({ location, type }) =>
        (location === "wargear"
          ? data.indexedAbilities
          : data.indexedWeapons
        ).get(type)!
    );

  const selectedNames = selectedTypes.map((type) => type.name);

  return (
    <div className="flex flex-col w-full px-4 py-4 gap-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-12 items-center">
        <div className="flex col-span-2 justify-center h-full overflow-hidden">
          <UnitIcon src={image} alt={name} />
        </div>
        <div className="col-span-10 px-4">
          <div className="text-lg">{name}</div>
          <StatLine data={statLine} />
        </div>
      </div>
      {selectedTypes.length > 0 && (
        <div className="flex flex-wrap items-center">
          <Tags tags={selectedNames} />
        </div>
      )}
    </div>
  );
};

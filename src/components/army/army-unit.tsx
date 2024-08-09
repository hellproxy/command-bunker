import { UnitIcon } from "../unit-icon";
import { StatLine } from "../statline";
import { Tags } from "../tags";
import { UnitStatusToggles } from "../unit-status";
import { useGameValues } from "@/stores/game";
import { UnitAbility, UnitWeapon, UnitWeaponHeader } from "../info/unit";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useUnitData } from "@/hooks/unit-data";

interface ArmyUnitProps {
  unit: ListBuilder.Unit;
  unitData: Immutable.Unit;
}

export const ArmyUnit = ({ unit, unitData }: ArmyUnitProps) => {
  const { options } = unit;
  const { data, error } = useUnitData();
  const status = useGameValues(({ unitStatuses }) => unitStatuses.get(unit.id));
  const [showData, setShowData] = useState(false);

  const ref = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShowData(false));

  useEffect(() => {
    if (showData) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [showData]);

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
  const overlayColor = () => {
    switch (status) {
      case "dead":
        return "bg-red-900";
      case "reserve":
        return "bg-gray-600";
      case "battle-shock":
        return "bg-yellow-600";
    }
  };

  return (
    <div className="relative" ref={ref}>
      {status && (
        <div
          className={`absolute left-0 w-full h-full rounded-lg pointer-events-none opacity-50 ${overlayColor()}`}
        />
      )}
      <div className=" flex flex-col w-full px-4 py-4 gap-4 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-12 items-center">
          <div
            className="flex col-span-2 justify-center h-full overflow-hidden cursor-pointer"
            onClick={() => setShowData((show) => !show)}
          >
            <UnitIcon
              src={image}
              alt={name}
              className="hover:border-blue-600"
            />
          </div>
          <div className="flex flex-col col-span-10 px-4 gap-2">
            <div className="flex flex-row items-center">
              <div className="text-lg grow">{name}</div>
              <div className="mx-2">
                <UnitStatusToggles unitId={unit.id} />
              </div>
            </div>
            <StatLine data={statLine} />
          </div>
        </div>
        {showData ? (
          <UnitInfo unit={unit} unitData={unitData} />
        ) : (
          selectedTypes.length > 0 && (
            <div className="flex flex-wrap items-center">
              <Tags tags={selectedNames} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

const UnitInfo = ({ unit, unitData }: ArmyUnitProps) => {
  const { rangedWeapons, meleeWeapons, abilities, coreAbilities } = unitData;
  const { options } = unit;

  const filteredRanged = rangedWeapons?.filter(
    ({ optional, type }) => !optional || options.get("ranged")?.get(type)
  );
  const filteredMelee = meleeWeapons?.filter(
    ({ optional, type }) => !optional || options.get("melee")?.get(type)
  );
  const filteredAbilities = abilities?.filter(
    ({ optional, type }) => !optional || options.get("wargear")?.get(type)
  );

  return (
    <div className="flex flex-col gap-2">
      {filteredRanged && (
        <div className="flex flex-col gap-y-1 text-sm">
          <UnitWeaponHeader ranged={true} />
          {filteredRanged?.map((weapon, index) => (
            <UnitWeapon key={index} weapon={weapon} title={weapon.name} />
          ))}
        </div>
      )}
      {filteredMelee && (
        <div className="flex flex-col gap-y-1 text-sm">
          <UnitWeaponHeader ranged={false} />
          {filteredMelee?.map((weapon, index) => (
            <UnitWeapon key={index} weapon={weapon} title={weapon.name} />
          ))}
        </div>
      )}
      {filteredAbilities && (
        <div className="flex flex-col gap-y-2 text-sm">
          <div className="px-2 py-1 bg-gray-200">Abilities</div>
          {filteredAbilities?.map((ability, index) => (
            <UnitAbility key={index} ability={ability} />
          ))}
        </div>
      )}
      {coreAbilities && (
        <div className="flex flex-col gap-y-2 text-sm">
          <div className="px-2 py-1 bg-gray-200">Core Abilities</div>
          <Tags tags={coreAbilities} />
        </div>
      )}
    </div>
  );
};

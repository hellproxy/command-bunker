import { StatLine } from "../statline";
import { Tags } from "../tags";
import { UnitIcon } from "../unit-icon";
import { UnitAbility, UnitWeapon, UnitWeaponHeader } from "../info/unit";

interface SearchUnitProps {
  unit: Immutable.Unit;
}

export const SearchUnit = ({ unit }: SearchUnitProps) => {
  const {
    name,
    image,
    statLine,
    rangedWeapons,
    meleeWeapons,
    abilities,
    coreAbilities,
  } = unit;

  return (
    <div className="flex flex-col w-full px-4 py-4 gap-2 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-12 items-center mb-2">
        <div className="flex col-span-2 justify-center h-full overflow-hidden">
          <UnitIcon src={image} alt={name} />
        </div>
        <div className="col-span-10 px-4">
          <div className="text-lg mb-2">{name}</div>
          <StatLine data={statLine} />
        </div>
      </div>
      {rangedWeapons && (
        <div className="flex flex-col gap-y-1 text-sm">
          <UnitWeaponHeader ranged={true} />
          {rangedWeapons?.map((weapon, index) => (
            <UnitWeapon key={index} weapon={weapon} title={weapon.name} />
          ))}
        </div>
      )}
      {meleeWeapons && (
        <div className="flex flex-col gap-y-1 text-sm">
          <UnitWeaponHeader ranged={false} />
          {meleeWeapons?.map((weapon, index) => (
            <UnitWeapon key={index} weapon={weapon} title={weapon.name} />
          ))}
        </div>
      )}
      {abilities && (
        <div className="flex flex-col gap-y-2 text-sm">
          <div className="px-2 py-1 bg-gray-200">Abilities</div>
          {abilities?.map((ability, index) => (
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

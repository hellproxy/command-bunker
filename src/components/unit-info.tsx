import { StatLine } from "./statline";
import { UnitIcon } from "./unit-icon";
import { WeaponHeader } from "./weapon-header";
import { WeaponRow3, WeaponRow } from "./weapon-info";

interface UnitInfoProps {
  unit: Immutable.Unit;
}

export const UnitInfo = ({ unit }: UnitInfoProps) => {
  const { name, image, statLine, rangedWeapons, meleeWeapons } = unit;

  return (
    <div className="flex flex-col w-full px-4 py-4 gap-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-12 items-center">
        <div className="flex col-span-2 justify-center h-full overflow-hidden">
          <UnitIcon src={image} alt={name} />
        </div>
        <div className="col-span-10 px-4">
          <div className="text-lg mb-2">{name}</div>
          <StatLine data={statLine} />
        </div>
      </div>
      <div className="flex flex-col gap-y-1 text-sm">
        {rangedWeapons && <UnitWeaponHeader ranged={true} />}
        {rangedWeapons?.map((weapon, index) => (
          <UnitWeapon key={index} weapon={weapon} title={weapon.name} />
        ))}
      </div>
      <div className="flex flex-col gap-y-1 text-sm">
        {meleeWeapons && <UnitWeaponHeader ranged={false} />}
        {meleeWeapons?.map((weapon, index) => (
          <UnitWeapon key={index} weapon={weapon} title={weapon.name} />
        ))}
      </div>
    </div>
  );
};

interface UnitWeaponHeaderProps {
  ranged: boolean;
  className?: string;
}

const UnitWeaponHeader = ({ ranged }: UnitWeaponHeaderProps) => {
  return (
    <div className="grid grid-cols-11 mb-1">
      <div className="col-span-2 bg-gray-200 pl-2 pr-1 py-1">Name</div>
      <WeaponHeader className="col-span-5 pl-1 py-1" ranged={ranged} />
      <div className="col-span-4 bg-gray-200 pl-2 pr-1 py-1">Tags</div>
    </div>
  );
};

interface UnitWeaponRowProps {
  weapon: Immutable.Weapon;
  title: string;
}

const UnitWeapon = ({ weapon, title }: UnitWeaponRowProps) => {
  if (weapon.alts) {
    const { name, profileName, alts } = weapon;

    return (
      <div className="flex flex-col gap-1 mt-1 pb-1 border-l bg-slate-100">
        <div className="flex items-center pl-2 pr-1 min-h-8">{name}</div>
        <WeaponRow3 weaponProfile={weapon} title={profileName} />
        {alts.map((alt) => (
          <WeaponRow3
            weaponProfile={alt}
            title={alt.profileName}
            className="min-h-8"
          />
        ))}
      </div>
    );
  } else {
    return (
      <WeaponRow3 weaponProfile={weapon} title={title} className="min-h-14" />
    );
  }
};

import { StatLine } from "./statline";
import { Tags } from "./tags";
import { UnitIcon } from "./unit-icon";
import { WeaponHeader } from "./weapon-header";
import { WeaponRow3 } from "./weapon-info";

interface UnitInfoProps {
  unit: Immutable.Unit;
}

export const UnitInfo = ({ unit }: UnitInfoProps) => {
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
      <div className={`flex flex-col gap-1 pb-1 border-l bg-slate-100`}>
        <div className="flex items-center pl-2 pr-1 min-h-10">{name}</div>
        <WeaponRow3 weaponProfile={weapon} title={profileName} />
        {alts.map((alt, index) => (
          <WeaponRow3
            key={index}
            weaponProfile={alt}
            title={alt.profileName}
            className="min-h-10"
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

interface UnitAbilityProps {
  ability: Immutable.Ability;
}

const UnitAbility = ({ ability }: UnitAbilityProps) => {
  const { name, description, subAbilities, tags } = ability;

  return (
    <div
      className={`flex flex-col px-2 gap-1 ${
        subAbilities ? "border-l bg-slate-100 py-1" : ""
      }`}
    >
      <div className="flex flew-row">
        <div className="flex items-center font-bold py-1">{name}</div>
        <div className="flex flex-row grow justify-end">
          <Tags tags={tags} className="justify-right" />
        </div>
      </div>
      <div className="text-justify">{description}</div>
      {subAbilities && (
        <div className="flex flex-col ml-4 gap-1">
          {subAbilities.map((sub, index) => (
            <div key={index}>
              <div>
                <b>{sub.name}</b>
              </div>
              <div className="text-justify">{sub.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import { Tags } from "../tags";
import { WeaponHeader } from "../weapon-header";
import { WeaponRow3 } from "./weapon";

interface UnitWeaponHeaderProps {
  ranged: boolean;
  className?: string;
}

export const UnitWeaponHeader = ({ ranged }: UnitWeaponHeaderProps) => {
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

export const UnitWeapon = ({ weapon, title }: UnitWeaponRowProps) => {
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

export const UnitAbility = ({ ability }: UnitAbilityProps) => {
  const { name, description, subAbilities, tags } = ability;

  return (
    <div
      className={`flex flex-col px-2 gap-1 ${
        subAbilities ? "border-l bg-slate-100 py-2" : ""
      }`}
    >
      <div className="flex flew-row">
        <div className="flex items-center font-bold">{name}</div>
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

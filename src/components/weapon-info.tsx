import { Crosshair, Sword } from "lucide-react";
import { Tags } from "./tags";
import { WeaponHeader } from "./weapon-header";
import { WeaponStatLine } from "./weapon-statline";

interface WeaponInfoProps {
  weapon: Immutable.Weapon;
  unitName: string;
}

export const WeaponInfo = ({ weapon, unitName }: WeaponInfoProps) => {
  const { name, range, alts, profileName } = weapon;

  const ranged = "melee" !== weapon.range;
  const profile = profileName || alts?.find((alt) => alt.profileName);
  const hasProfiles = profile !== undefined;

  return (
    <div className="flex flex-col px-4 py-4 gap-3 bg-white rounded-lg shadow-md text-sm">
      <div className="flex flex-row gap-2 items-stretch">
        <div className="flex items-center">
          {ranged ? <Crosshair size={18} /> : <Sword size={18} />}
        </div>
        <div className="flex flex-row items-baseline grow">
          <div className="text-lg">{name}</div>
          <div className="text-gray-400 grow text-right">{unitName}</div>
        </div>
      </div>
      <div className="grid grid-cols-11 gap-y-2">
        {hasProfiles ? (
          <>
            <div className="col-span-2 bg-gray-200 pl-2 pr-1 py-1">Profile</div>
            <div className="col-span-4 bg-gray-200 px-1 py-1">Tags</div>
            <WeaponHeader className="col-span-5 pl-1 py-1" range={range} />
          </>
        ) : (
          <>
            <div className="col-span-6 bg-gray-200 pl-2 pr-1 py-1">Tags</div>
            <WeaponHeader className="col-span-5 pl-1 py-1" range={range} />
          </>
        )}
        <WeaponLine weapon={weapon} hasProfiles={hasProfiles} />
        {(alts || []).map((alt, index) => (
          <WeaponLine key={index} weapon={alt} hasProfiles={hasProfiles} />
        ))}
      </div>
    </div>
  );
};

interface WeaponLineProps {
  weapon: Immutable.WeaponProfile;
  hasProfiles: boolean;
}

const WeaponLine = ({ weapon, hasProfiles }: WeaponLineProps) => {
  return hasProfiles ? (
    <>
      <div className="flex items-center col-span-2 pl-2 pr-1">
        {weapon.profileName}
      </div>
      <Tags
        className="col-span-4 px-1"
        tags={weapon.tags}
        placeholder={NoTags}
      />
      <div className="flex flex-col justify-center pl-1 col-span-5">
        <WeaponStatLine weapon={weapon} />
      </div>
    </>
  ) : (
    <>
      <Tags
        className="col-span-6 pr-1"
        tags={weapon.tags}
        placeholder={NoTags}
      />
      <div className="flex flex-col justify-center pl-1 col-span-5">
        <WeaponStatLine weapon={weapon} />
      </div>
    </>
  );
};

const NoTags = <div className="pl-2">-</div>;

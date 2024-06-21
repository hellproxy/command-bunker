import { Crosshair, Sword } from "lucide-react";
import { Tags } from "./tags";
import { WeaponHeader } from "./weapon-header";
import { WeaponStatLine } from "./weapon-statline";
import { immutable } from "swr/immutable";

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
      <div className="flex flex-col gap-y-2">
        {hasProfiles ? (
          <div className="grid grid-cols-11">
            <div className="col-span-2 bg-gray-200 pl-2 pr-1 py-1">Profile</div>
            <WeaponHeader className="col-span-5 pl-1 py-1" ranged={ranged} />
            <div className="col-span-4 bg-gray-200 px-1 py-1">Tags</div>
          </div>
        ) : (
          <div className="grid grid-cols-11">
            <WeaponHeader className="col-span-5 pl-1 py-1" ranged={ranged} />
            <div className="col-span-6 bg-gray-200 pl-2 pr-1 py-1">Tags</div>
          </div>
        )}
        <WeaponRow weaponProfile={weapon} hasProfiles={hasProfiles} />
        {(alts || []).map((alt, index) => (
          <WeaponRow
            key={index}
            weaponProfile={alt}
            hasProfiles={hasProfiles}
          />
        ))}
      </div>
    </div>
  );
};

interface WeaponRowProps {
  weaponProfile: Immutable.WeaponProfile;
  hasProfiles: boolean;
}

export const WeaponRow = ({ weaponProfile, hasProfiles }: WeaponRowProps) => {
  const { profileName } = weaponProfile;

  return hasProfiles ? (
    <WeaponRow3 weaponProfile={weaponProfile} title={profileName} />
  ) : (
    <WeaponRow2 weaponProfile={weaponProfile} />
  );
};

interface WeaponRow3Props {
  weaponProfile: Immutable.WeaponProfile;
  title: string;
  className?: string;
  titleClassName?: string;
}

export const WeaponRow3 = ({
  weaponProfile,
  title,
  className,
  titleClassName,
}: WeaponRow3Props) => {
  const { tags } = weaponProfile;

  return (
    <div className={`grid grid-cols-11 ${className || ""}`}>
      <div
        className={`flex items-center col-span-2 pl-2 pr-1 ${
          titleClassName || ""
        }`}
      >
        {title}
      </div>
      <div className="flex flex-col justify-center pl-1 col-span-5">
        <WeaponStatLine weapon={weaponProfile} />
      </div>
      <Tags className="col-span-4 px-1" tags={tags} placeholder={NoTags} />
    </div>
  );
};

interface WeaponRow2Props {
  weaponProfile: Immutable.WeaponProfile;
}

export const WeaponRow2 = ({ weaponProfile }: WeaponRow2Props) => {
  const { tags } = weaponProfile;

  return (
    <div className="grid grid-cols-11">
      <div className="flex flex-col justify-center pl-1 col-span-5">
        <WeaponStatLine weapon={weaponProfile} />
      </div>
      <Tags className="col-span-6 pr-1" tags={tags} placeholder={NoTags} />
    </div>
  );
};

const NoTags = <div className="pl-2">-</div>;

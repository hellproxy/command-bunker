import { Tags } from "../tags";
import { WeaponStatLine } from "../weapon-statline";

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

interface WeaponStatLineProps {
  weapon: Immutable.WeaponProfile;
  className?: string;
}

export const WeaponStatLine = ({
  weapon: { range, attacks, skill, strength, ap, damage },
  className,
}: WeaponStatLineProps) => {
  return (
    <div className={`grid grid-cols-6 weapon-statline ${className || ""}`}>
      <div>{typeof range === "number" ? `${range}"` : range}</div>
      <div>{attacks}</div>
      <div>{typeof skill === "number" ? `${skill}+` : range}</div>
      <div>{strength}</div>
      <div>{ap}</div>
      <div>{damage}</div>
    </div>
  );
};

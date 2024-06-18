interface WeaponHeaderProps {
  range: Immutable.Range;
  className?: string;
}

export const WeaponHeader = ({ range, className }: WeaponHeaderProps) => {
  return (
    <div
      className={`grid grid-cols-6 weapon-statline bg-gray-200 ${
        className || ""
      }`}
    >
      <div>Range</div>
      <div>A</div>
      <div>{range === "melee" ? "WS" : "BS"}</div>
      <div>S</div>
      <div>AP</div>
      <div>D</div>
    </div>
  );
};

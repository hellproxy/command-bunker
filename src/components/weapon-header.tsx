interface WeaponHeaderProps {
  ranged: boolean;
  className?: string;
}

export const WeaponHeader = ({ ranged, className }: WeaponHeaderProps) => {
  return (
    <div
      className={`grid grid-cols-6 weapon-statline bg-gray-200 ${
        className || ""
      }`}
    >
      <div>Range</div>
      <div>A</div>
      <div>{ranged ? "BS" : "WS"}</div>
      <div>S</div>
      <div>AP</div>
      <div>D</div>
    </div>
  );
};

import Image from "next/image";

interface UnitIconProps {
  src: string;
  alt: string;
}

export const UnitIcon = (props: UnitIconProps) => {
  return (
    <Image
      {...props}
      width={50}
      height={50}
      className="w-16 rounded-xl border-2"
    />
  );
};

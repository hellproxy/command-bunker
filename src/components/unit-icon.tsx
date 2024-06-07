import Image from "next/image";

interface UnitIconProps {
  src: string;
  alt: string;
}

export const UnitIcon = ({ src, alt }: UnitIconProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={50}
      height={50}
      className="w-16 rounded-xl border-2"
    />
  );
};

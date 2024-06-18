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
      quality={60}
      width={100}
      height={100}
      className="object-cover rounded-xl border-2"
    />
  );
};

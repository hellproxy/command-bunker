import { useGlyphs } from "@/hooks/glyphs";
import { Noto_Sans_Mongolian } from "next/font/google";

const mongolian = Noto_Sans_Mongolian({
  weight: "400",
  subsets: ["mongolian"],
});

interface MagicGlyphProps {
  name: string;
  reloadKey: string;
}

export const MagicGlyph = ({ name, reloadKey }: MagicGlyphProps) => {
  const { glyphs, isLoading } = useGlyphs();

  if (isLoading) return <div>..</div>;
  if (!glyphs) return <div>??</div>;

  const glyph = glyphs.get(name)!;
  const adj = 8 + (glyph.adjustment || 0);
  const codePoint = glyph.index + 6144;

  return (
    <div className={`text-blue-600 select-none ${mongolian.className}`}>
      <div
        key={reloadKey}
        className="relative max-h-[24px] text-2xl text-nova"
        style={{ bottom: `${adj}px` }}
      >
        {String.fromCodePoint(codePoint)}
      </div>
    </div>
  );
};

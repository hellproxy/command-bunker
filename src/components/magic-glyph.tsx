import { useGlyphs } from "@/hooks/glyphs";
import { createHash } from "crypto";

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
    <div className="text-blue-600 select-none font-mongolian">
      <div
        key={reloadKey}
        className="relative max-h-[24px] text-2xl nova"
        style={{ bottom: `${adj}px` }}
      >
        {String.fromCodePoint(codePoint)}
      </div>
    </div>
  );
};

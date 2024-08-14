import { useEnhancements } from "@/hooks/enhancements";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { EnhancementItem } from "./enhancement-item";
import { FlaskConical } from "lucide-react";

interface EnhancementSupplyProps {
  listId: string;
}

export const EnhancementSupply = ({ listId }: EnhancementSupplyProps) => {
  const ref = useRef<null | HTMLDivElement>(null);
  const { enhancements, allocation } = useEnhancements(listId);
  const [show, setShow] = useState(false);

  useOnClickOutside(ref, () => setShow(false));

  return (
    <div
      className="fixed right-6 bottom-6 flex flex-col-reverse gap-2 items-end"
      ref={ref}
    >
      <div
        className="bg-white p-2 border-2 rounded-full shadow-lg
            border-yellow-500 text-yellow-500
            hover:border-yellow-600 hover:text-yellow-600 hover:bg-yellow-50
            cursor-pointer disabled:cursor-not-allowed"
        onClick={() => setShow((show) => !show)}
      >
        <FlaskConical size={30} strokeWidth={1.7} />
      </div>
      {show && (
        <div className="flex flex-col-reverse items-end gap-2">
          {Array.from(enhancements?.values() || [])
            .filter((enhancement) => !allocation.has(enhancement.type))
            .map((enhancement) => (
              <EnhancementItem
                key={enhancement.type}
                enhancement={enhancement}
                elevated={true}
              />
            ))}
        </div>
      )}
    </div>
  );
};

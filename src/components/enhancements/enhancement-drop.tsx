import { useEnhancement } from "@/hooks/enhancements";
import { useDroppable } from "@dnd-kit/core";
import { EnhancementItem } from "./enhancement-item";

interface EnhancementTargetProps {
  listId: string;
  unitId: string;
}

export interface EnhancementTargetData {
  unitId: string;
  populated: boolean;
}

export const EnhancementTarget = ({
  listId,
  unitId,
}: EnhancementTargetProps) => {
  const enhancement = useEnhancement(listId, unitId);
  const data: EnhancementTargetData = { unitId, populated: !!enhancement };
  const { setNodeRef, active, isOver } = useDroppable({ id: unitId, data });

  const borderColor = isOver ? "border-yellow-500" : "border-gray-200";
  const size = active?.data.current?.size;
  const style = enhancement ? {} : size;

  return (
    (active || enhancement) && (
      <div
        ref={setNodeRef}
        className={`border-2 rounded-lg border-dashed ${borderColor}`}
        style={style}
      >
        {enhancement && (
          <div className="m-[-2px]">
            <EnhancementItem enhancement={enhancement} unitId={unitId} />
          </div>
        )}
      </div>
    )
  );
};

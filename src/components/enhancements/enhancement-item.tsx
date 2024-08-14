import useElementSize, { Size } from "@custom-react-hooks/use-element-size";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface EnhancementItemProps {
  enhancement: Immutable.Enhancement;
  elevated?: boolean;
  unitId?: string;
}

export interface EnhancementItemData {
  size: Size;
  unitId?: string;
  enhancement: Immutable.EnhancementType;
}

export const EnhancementItem = ({
  enhancement,
  elevated,
  unitId,
}: EnhancementItemProps) => {
  const { type, name } = enhancement;
  const [setRef, size] = useElementSize();
  const data: EnhancementItemData = { size, unitId, enhancement: type };
  const { setNodeRef, transform, listeners, attributes, isDragging } =
    useDraggable({ id: type, data });

  const style = { transform: CSS.Translate.toString(transform) };
  const shadow = elevated || isDragging ? "shadow-lg" : "";

  return (
    <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
      <div
        ref={setRef}
        className={`px-2 py-1 bg-white border-2 rounded-lg select-none cursor-move text-nowrap
          border-yellow-500 hover:border-yellow-600 hover:text-yellow-950 hover:bg-yellow-50
          z-20 ${shadow}`}
      >
        {name}
      </div>
    </div>
  );
};

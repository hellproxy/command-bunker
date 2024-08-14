import { useListStore } from "@/stores/lists";
import { DndContext } from "@dnd-kit/core";
import { PropsWithChildren } from "react";
import { EnhancementItemData } from "./enhancement-item";
import { EnhancementTargetData } from "./enhancement-drop";

type EnhancementContextProps = PropsWithChildren<{
  listId: string;
}>;

export const EnhancementContext = ({
  listId,
  children,
}: EnhancementContextProps) => {
  const moveEnhancement = useListStore((state) => state.moveEnhancement);

  return (
    <DndContext
      onDragEnd={({ over, active }) => {
        const source = active.data.current as EnhancementItemData | undefined;
        const target = over?.data.current as EnhancementTargetData | undefined;

        const from = source?.unitId;
        const enhancement = source?.enhancement;
        const to = target?.unitId;
        const populated = target?.populated;

        if (over && !populated) {
          // add enhancement from supply or move between units
          moveEnhancement(listId, { from, to, enhancement });
        } else if (!over) {
          // remove enhancement (back to supply)
          moveEnhancement(listId, { from });
        }
      }}
    >
      {children}
    </DndContext>
  );
};

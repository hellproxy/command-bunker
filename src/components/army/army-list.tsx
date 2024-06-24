import { useListStore } from "@/stores/lists";
import { SectionHeader } from "../section-header";

interface ArmyListProps {
  listId: string;
}

export const ArmyList = ({ listId }: ArmyListProps) => {
  const list = useListStore((state) => state.getList(listId));

  // 1. dropdown top right with dead/removed/etc
  // 2. chosen weapon options displayed along bottom below statline

  return (
    <>
      <SectionHeader>Characters</SectionHeader>
      {Array.from(list.units).map((id, unit) => {
        return <></>;
      })}
      <SectionHeader>Infantry</SectionHeader>
      <SectionHeader>Non-Infantry</SectionHeader>
      <SectionHeader>Allies</SectionHeader>
    </>
  );
};

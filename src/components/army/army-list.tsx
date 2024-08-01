import { useGetList, useListStore } from "@/stores/lists";
import { SectionHeader } from "../section-header";
import { ArmyUnit } from "./army-unit";
import { useUnitData } from "@/hooks/data";

interface ArmyListProps {
  listId: string;
}

export const ArmyList = ({ listId }: ArmyListProps) => {
  const list = useGetList(listId);
  const { data, error } = useUnitData();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // 1. dropdown top right with dead/removed/etc
  // 2. chosen weapon options displayed along bottom below statline

  const units = Array.from(list.units).map(([id, unit]) => ({
    id,
    unit,
    unitData: data.indexedUnits.get(unit.type)!,
  }));

  const unitsForSection = (section: Immutable.Section) =>
    units.filter(({ unitData }) => unitData.section === section);

  return (
    <>
      <SectionHeader>Characters</SectionHeader>
      {unitsForSection("characters").map(({ id, unit, unitData }) => (
        <ArmyUnit key={id} unit={unit} unitData={unitData} />
      ))}
      <SectionHeader>Infantry</SectionHeader>
      {unitsForSection("infantry").map(({ id, unit, unitData }) => (
        <ArmyUnit key={id} unit={unit} unitData={unitData} />
      ))}
      <SectionHeader>Non-Infantry</SectionHeader>
      {unitsForSection("nonInfantry").map(({ id, unit, unitData }) => (
        <ArmyUnit key={id} unit={unit} unitData={unitData} />
      ))}
      <SectionHeader>Allies</SectionHeader>{" "}
      {unitsForSection("allies").map(({ id, unit, unitData }) => (
        <ArmyUnit key={id} unit={unit} unitData={unitData} />
      ))}
    </>
  );
};

interface UnitsForSectionProps {
  units: {
    id: string;
    unit: ListBuilder.Unit;
    unitData: Immutable.Unit;
  }[];
  section: Immutable.Section;
}

const UnitsForSection = ({ units, section }: UnitsForSectionProps) => {};

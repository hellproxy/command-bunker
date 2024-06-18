"use client";

import { useListStore } from "@/stores/lists";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useUnitData } from "@/hooks/data";
import { ChangeEvent, useEffect, useRef } from "react";
import { UnitIcon } from "@/components/unit-icon";
import { MagicGlyph } from "@/components/magic-glyph";
import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/section-header";

interface ListBuilderProps {
  params: {
    listId: string;
  };
}

export default function ListBuilder({ params: { listId } }: ListBuilderProps) {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex flex-col gap-2 pl-1 pr-2 py-2 max-h-full overflow-auto">
        <SectionHeader>Characters</SectionHeader>
        <UnitPickerSection listId={listId} section="characters" />
        <SectionHeader>Infantry</SectionHeader>
        <UnitPickerSection listId={listId} section="infantry" />
        <SectionHeader>Non-Infantry</SectionHeader>
        <UnitPickerSection listId={listId} section="nonInfantry" />
        <SectionHeader>Allies</SectionHeader>
        <UnitPickerSection listId={listId} section="allies" />
      </div>
      <div className="flex flex-col gap-2 pl-1 pr-2 py-2 max-h-full overflow-auto">
        <SectionHeader>Characters</SectionHeader>
        <UnitCustomizerSection listId={listId} section="characters" />
        <SectionHeader>Infantry</SectionHeader>
        <UnitCustomizerSection listId={listId} section="infantry" />
        <SectionHeader>Non-Infantry</SectionHeader>
        <UnitCustomizerSection listId={listId} section="nonInfantry" />
        <SectionHeader>Allies</SectionHeader>
        <UnitCustomizerSection listId={listId} section="allies" />
      </div>
    </div>
  );
}

interface UnitPickerSectionProps {
  listId: string;
  section: Immutable.Section;
}

const UnitPickerSection = ({ listId, section }: UnitPickerSectionProps) => {
  const { data, error } = useUnitData();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const order = data.orders[section];

  return (
    <div className="flex flex-col gap-2">
      {order.map((type) => (
        <UnitPickerCard key={type} type={type} listId={listId} />
      ))}
    </div>
  );
};

interface UnitCustomizerSectionProps {
  listId: string;
  section: Immutable.Section;
}

const UnitCustomizerSection = dynamic(
  () => Promise.resolve(UnitCustomizerSectionSSR),
  { ssr: false }
);

const UnitCustomizerSectionSSR = ({
  listId,
  section,
}: UnitCustomizerSectionProps) => {
  const list = useListStore((state) => state.getList(listId));
  const { data, error } = useUnitData();

  if (error) return <div>Failed to load</div>;
  if (!data || !list) return <div>Loading...</div>;

  const { indexedUnits } = data;

  return (
    <>
      {Array.from(list.units)
        .filter(([, unit]) => indexedUnits.get(unit.type)?.section === section)
        .map(([id, unit]) => (
          <UnitCuztomizer key={id} unit={unit} listId={list.listId} />
        ))}
    </>
  );
};

interface UnitPickerCardProps {
  listId: string;
  type: string;
}

const UnitPickerCard = ({ listId, type }: UnitPickerCardProps) => {
  const addUnit = useListStore((state) => state.addUnit(listId));
  const { data, error } = useUnitData();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { indexedUnits } = data;
  const unitData = indexedUnits.get(type)!;

  return (
    <div className="p-4 rounded-lg bg-white shadow-md">
      <div className="grid grid-cols-9 items-center gap-4">
        <div className="col-span-1">
          <UnitIcon src={unitData.image} alt={unitData.name} />
        </div>
        <div className="col-span-7 justify-left">{unitData.name}</div>
        <div className="col-span-1">
          <button
            className="btn btn-green"
            onClick={() => addUnit(newUnit(unitData))}
          >
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
};

interface UnitCustomizerProps {
  listId: string;
  unit: ListBuilder.Unit;
}

const UnitCuztomizer = ({ listId, unit }: UnitCustomizerProps) => {
  const removeUnit = useListStore((state) => state.removeUnit(listId, unit.id));
  const justAdded = useListStore((state) => state.wasJustAdded(unit.id));
  const { data, error } = useUnitData();
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (justAdded) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { indexedUnits } = data;
  const unitData = indexedUnits.get(unit.type)!;

  const ranged = unit.options.get("ranged")!;
  const melee = unit.options.get("melee")!;
  const wargear = unit.options.get("wargear")!;

  const boxNova = justAdded ? "box-nova" : "";

  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-lg bg-white shadow-md ${boxNova}`}
      ref={ref}
    >
      <div className="grid grid-cols-9 items-center space-x-4">
        <div className="col-span-1">
          <UnitIcon src={unitData.image} alt={unitData.name} />
        </div>
        <div className="col-span-7 justify-left">{unitData.name}</div>
        <div className="col-span-1">
          <button className="btn btn-red" onClick={removeUnit}>
            <Trash2 />
          </button>
        </div>
      </div>
      {ranged.size || melee.size || wargear.size ? (
        <ul className="flex flex-wrap gap-2">
          {Array.from(ranged).map(([weapon, selected]) => (
            <li key={weapon}>
              <SelectableOption
                listId={listId}
                unitId={unit.id}
                option={weapon}
                selected={selected}
                location="ranged"
              />
            </li>
          ))}
          {Array.from(melee).map(([weapon, selected]) => (
            <li key={weapon}>
              <SelectableOption
                listId={listId}
                unitId={unit.id}
                option={weapon}
                selected={selected}
                location="melee"
              />
            </li>
          ))}
          {Array.from(wargear).map(([wargear, selected]) => (
            <li key={wargear}>
              <SelectableOption
                listId={listId}
                unitId={unit.id}
                option={wargear}
                selected={selected}
                location="wargear"
              />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

interface SelectableOptionProps {
  listId: string;
  unitId: string;
  option: string;
  selected: boolean;
  location: ListBuilder.Location;
}

const SelectableOption = (props: SelectableOptionProps) => {
  const { listId, unitId, option, selected, location } = props;
  const { data, error } = useUnitData();
  const setOption = useListStore((state) =>
    state.setOption(listId, unitId, location, option)
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const isWeapon = location === "ranged" || location === "melee";
  const index = isWeapon ? data.indexedWeapons : data.indexedAbilities;
  const { name } = index.get(option)!;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.checked);
  };

  const id = `${unitId}-${option}`;
  const visibility = selected ? "visible" : "invisible";

  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="hidden peer"
        checked={selected}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className="flex items-center gap-2 w-70 px-2 py-1 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-slate-800 hover:bg-gray-50"
      >
        <div className="block">
          <div className="select-none">{name}</div>
        </div>
        <div className={`flex justify-center ${visibility}`}>
          <MagicGlyph name={name} reloadKey={visibility} />
        </div>
      </label>
    </>
  );
};

const newUnit = (data: Immutable.Unit): ListBuilder.Unit => {
  return {
    id: uuidv4(),
    type: data.type,
    options: new Map([
      ["ranged", toggleMap(data.rangedWeapons)],
      ["melee", toggleMap(data.meleeWeapons)],
      ["wargear", toggleMap(data.abilities)],
    ]),
  };
};

interface Optional {
  type: string;
  optional?: boolean;
}

const toggleMap = (options?: Optional[]): Map<string, boolean> => {
  return (options || [])
    .filter((options) => options.optional)
    .reduce((map, options) => {
      map.set(options.type, false);
      return map;
    }, new Map());
};

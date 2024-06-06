"use client";

import { useListStore } from "@/stores/lists";
import { Check, Plus, Trash2 } from "react-feather";
import { v4 as uuidv4 } from "uuid";
import { useUnitData } from "@/hooks/data";
import { ChangeEvent } from "react";
import { UnitIcon } from "@/app/unit-icon";

interface Props {
  params: {
    listId: string;
  };
}

export default function ListBuilder({ params: { listId } }: Props) {
  const list = useListStore((state) => state.getList(listId));
  const { data, error } = useUnitData();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { unitOrder } = data;

  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex flex-col gap-2 pl-2 pr-1 py-2 max-h-full overflow-auto">
        {unitOrder.map((type) => (
          <UnitPickerCard key={type} type={type} listId={list.listId} />
        ))}
      </div>
      <div className="flex flex-col gap-2 pl-1 pr-2 py-2 max-h-full overflow-auto">
        {list.units.map((unit) => (
          <UnitCard key={unit.type} unit={unit} listId={list.listId} />
        ))}
      </div>
    </div>
  );
}

interface UnitPickerCardProps {
  listId: string;
  type: string;
}

const UnitPickerCard = ({ listId, type }: UnitPickerCardProps) => {
  const addUnit = useListStore((state) => state.addUnit(listId));
  const { data } = useUnitData();

  const { indexedUnits } = data!;
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

interface UnitCardProps {
  listId: string;
  unit: ListBuilder.Unit;
}

const UnitCard = ({ listId, unit }: UnitCardProps) => {
  const removeUnit = useListStore((state) => state.removeUnit(listId, unit.id));
  const { data } = useUnitData();

  const { indexedUnits } = data!;
  const unitData = indexedUnits.get(unit.type)!;

  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-white shadow-md">
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
      <ul className="flex flex-wrap gap-2">
        {unit.rangedWeaponOptions.map((weapon) => (
          <li key={weapon.type}>
            <SelectableOption
              listId={listId}
              unitId={unit.id}
              option={weapon}
              type="weapon"
            />
          </li>
        ))}
        {unit.meleeWeaponOptions.map((weapon) => (
          <li key={weapon.type}>
            <SelectableOption
              listId={listId}
              unitId={unit.id}
              option={weapon}
              type="weapon"
            />
          </li>
        ))}
      </ul>
      <ul>
        {unit.wargearOptions.map((wargear) => (
          <li key={wargear.type}>
            <SelectableOption
              listId={listId}
              unitId={unit.id}
              option={wargear}
              type="wargear"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

interface SelectableOptionProps {
  listId: string;
  unitId: string;
  option: ListBuilder.Selectable;
  type: "weapon" | "wargear";
}

const SelectableOption = (props: SelectableOptionProps) => {
  const { listId, unitId, option, type } = props;
  const { data } = useUnitData();

  let location: "melee" | "ranged" | "wargear";
  let glyph: number;
  let weaponData: Immutable.Weapon;
  let wargearData: Immutable.Ability;

  if (type == "weapon") {
    const { indexedWeapons } = data!;
    weaponData = indexedWeapons.get(option.type)!;
    location = weaponData.range === "melee" ? "melee" : "ranged";
    glyph = weaponData.glyph;
  } else {
    const { indexedAbilities } = data!;
    wargearData = indexedAbilities.get(option.type)!;
    location = "wargear";
    glyph = wargearData.glyph;
  }

  const selected = useListStore((state) =>
    state.isSelected(listId, unitId, option.type, location)
  );
  const setOption = useListStore((state) =>
    state.setOption(listId, unitId, option.type, location)
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.checked);
  };

  const id = `${unitId}-${option.type}`;
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
          {type === "weapon" ? (
            <Weapon weapon={weaponData!} />
          ) : (
            <Wargear wargear={wargearData!} />
          )}
        </div>
        <div className={`flex justify-center ${visibility}`}>
          <div className="text-blue-600 select-none font-mongolian">
            <div
              key={visibility}
              className="relative bottom-[8px] max-h-[24px] text-2xl nova"
            >
              {String.fromCodePoint(glyph)}
            </div>
          </div>
        </div>
      </label>
    </>
  );
};

interface WeaponProps {
  weapon: Immutable.Weapon;
}

const Weapon = ({ weapon }: WeaponProps) => {
  return <div className="select-none">{weapon.name}</div>;
};

interface WargearProps {
  wargear: Immutable.Ability;
}

const Wargear = ({ wargear }: WargearProps) => {
  return (
    <>
      <div className="w-full select-none">{wargear.name}</div>
      <div className="w-full text-sm select-none">{wargear.description}</div>
    </>
  );
};

const newUnit = (data: Immutable.Unit): ListBuilder.Unit => {
  return {
    id: uuidv4(),
    type: data.type,
    rangedWeaponOptions: newWeapons(data.rangedWeapons),
    meleeWeaponOptions: newWeapons(data.meleeWeapons),
    wargearOptions: newWargear(data.abilities),
  };
};

const newWeapons = (weapons: Immutable.Weapon[]): ListBuilder.Weapon[] => {
  return weapons
    .filter((weapon) => weapon.optional)
    .map((weapon) => ({
      type: weapon.type,
      selected: false,
    }));
};

const newWargear = (abilities: Immutable.Ability[]): ListBuilder.Ability[] => {
  return abilities
    .filter((ability) => ability.wargearOption)
    .map((wargear) => ({
      type: wargear.type,
      selected: false,
    }));
};

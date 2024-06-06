namespace ListBuilder {
  export interface List {
    listId: string;
    name: string;
    units: Map<string, Unit>;
  }

  export interface Unit {
    id: string;
    type: string;
    options: Map<Location, Map<string, boolean>>;
  }

  export interface Selectable {
    type: string;
    selected: boolean;
  }

  export type Location = "ranged" | "melee" | "wargear";
  export type Weapon = Selectable;
  export type Ability = Selectable;
}

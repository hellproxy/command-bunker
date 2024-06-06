namespace ListBuilder {
  export interface List {
    listId: string;
    name: string;
    units: Unit[];
  }

  export interface Unit {
    id: string;
    type: string;
    rangedWeaponOptions: Weapon[];
    meleeWeaponOptions: Weapon[];
    wargearOptions: Ability[];
  }

  export interface Selectable {
    type: string;
    selected: boolean;
  }

  export type Weapon = Selectable;
  export type Ability = Selectable;
}

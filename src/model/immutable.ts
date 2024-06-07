namespace Immutable {
  export interface Unit {
    readonly type: string;
    readonly name: string;
    readonly image: string;
    readonly section: Section;
    readonly cabalPoints?: number;
    readonly statsLine: StatsLine;
    readonly rangedWeapons: Weapon[];
    readonly meleeWeapons: Weapon[];
    readonly abilities: Ability[];
  }

  export interface StatsLine {
    movement: number;
    toughness: number;
    armourSave: number;
    invulnerableSave?: number;
    wounds: number;
    leadership: number;
    objectiveControl: number;
  }

  export interface Weapon {
    readonly type: string;
    readonly name: string;
    readonly range: Range;
    readonly attacks: Attacks;
    readonly skill: Skill;
    readonly strength: number;
    readonly ap: number;
    readonly damage: Damage;
    readonly tags: string[];
    readonly optional?: boolean;
    readonly supercharge: {
      readonly range: Range;
      readonly attacks: Attacks;
      readonly skill: Skill;
      readonly strength: number;
      readonly ap: number;
      readonly damage: Damage;
      readonly tags: string[];
    };
  }

  export interface Ability {
    readonly type: string;
    readonly name: string;
    readonly description: string;
    readonly wargearOption?: boolean;
  }

  export type Section = "characters" | "infantry" | "nonInfantry";
  export type Range = number | "melee";
  export type Attacks = number | `D${number}`;
  export type Skill = number | "N/A";
  export type Damage = number | `D${number}`;
}

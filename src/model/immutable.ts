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
    readonly coreAbilities: string[];
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
    readonly profileName: string;
    readonly range: Range;
    readonly attacks: Attacks;
    readonly skill: Skill;
    readonly strength: number;
    readonly ap: number;
    readonly damage: Damage;
    readonly tags?: string[];
    readonly optional?: boolean;
    readonly alt: {
      readonly profileName: string;
      readonly range: Range;
      readonly attacks: Attacks;
      readonly skill: Skill;
      readonly strength: number;
      readonly ap: number;
      readonly damage: Damage;
      readonly tags?: string[];
    };
  }

  export interface Ability {
    readonly type: string;
    readonly name: string;
    readonly description: string;
    readonly wargearOption?: boolean;
    readonly tags?: string[];
    readonly subAbilities?: 
  }

  export type Section = "characters" | "infantry" | "nonInfantry";
  export type Range = number | "melee";
  export type Attacks = number | `D${number}` | `${number}D${number}`;
  export type Skill = number | "N/A";
  export type Damage = number | `D${number}` | `${number}D${number}`;
}

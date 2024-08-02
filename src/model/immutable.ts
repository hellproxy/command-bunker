namespace Immutable {
  export interface Unit {
    readonly type: string;
    readonly name: string;
    readonly image: string;
    readonly section: Section;
    readonly cabalPoints?: number;
    readonly statLine: StatLine;
    readonly altStatLines?: StatLine[];
    readonly rangedWeapons?: Weapon[];
    readonly meleeWeapons?: Weapon[];
    readonly coreAbilities?: string[];
    readonly abilities?: Ability[];
  }

  export interface StatLine {
    name?: string;
    movement: number;
    toughness: number;
    armourSave: number;
    invulnerableSave?: number;
    wounds: number;
    leadership: number;
    objectiveControl: number;
  }

  export interface Weapon extends WeaponProfile {
    readonly type: string;
    readonly name: string;
    readonly optional?: boolean;
    readonly alts: WeaponProfile[];
  }

  export interface WeaponProfile {
    readonly profileName: string;
    readonly range: Range;
    readonly attacks: Attacks;
    readonly skill: Skill;
    readonly strength: number;
    readonly ap: number;
    readonly damage: Damage;
    readonly tags?: string[];
  }

  export interface Ability {
    readonly type: string;
    readonly name: string;
    readonly description: string;
    readonly optional?: boolean;
    readonly tags?: string[];
    readonly subAbilities?: {
      readonly name: string;
      readonly description: string;
      readonly tags?: string[];
    }[];
  }

  export interface Stratagem {
    readonly type: string;
    readonly cost: number;
  }

  export type Section = "characters" | "infantry" | "nonInfantry" | "allies";
  export type DiceRoll = `${number | ""}D${number}${`+${number}` | ""}`;
  export type Attacks = number | DiceRoll;
  export type Damage = number | DiceRoll;
  export type Range = number | "melee";
  export type Skill = number | "N/A";
}

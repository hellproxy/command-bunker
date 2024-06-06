Command Bunker app

- Single page
- Tab selection
- Stats and abilities at a glance
- Mark as dead
- Mark as in reserve

- Tracks round
- Tracks VPs
- Tracks CPs
- Tracks Cabal Points (current + max)
- Phase checklist
- Game log
- Undo

====================================

Command Phase
- Gain one CP (automatic)
- Draw mission
- Choose Kindred Sorcery
- Umbralefic crystal
- Rebind Rubricae

Movement Phase
- Set up from reserves
- Daemon Prince flyby
- Ritual: Temporal Surve (optional)

Shooting Phase
- Stratagem: Ensorcelled Infusion (optional)
- Ritual: Doombolt (optional)
- Ritual: Twist of Fate (optional)

Fight Phase
- Ritual: Twist of Fate (optional)

End of Turn
- Discard secondary mission (+1 CP) (optional)

Enemy turn

Command Phase
- Gain one CP (automatic)

Movement Phase
- Stratagem: Overwatch (optional)

Shooting Phase
- Ritual: Destined by Fate (optional)
- Ritual: Weaver of Fates (optional)

Fight Phase
- Daemon price aetherstride (optional)

====================================

Action
- title: string
- description: string
- tags: "automatic", "optional", "stratagem", "ritual"
- prerequisites: list[function]
- results: list[function]

Unit
- id
- title
- image
- statline
- abilities
- rangedWeapons
- meleeWeapons
- cabalPoints
- leader

Statline
- movement
- toughness
- armourSave
- invulnerableSave
- wounds
- leadership
- objectiveControl

Weapon
- id
- name
- type
- range
- attacks
- skill
- strength
- ap
- damage
- tags

====================================

### list store
### game store

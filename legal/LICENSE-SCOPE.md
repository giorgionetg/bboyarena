# BboyArena License Scope

Draft policy. This document is intended to describe the current project intent and contribution rules. It is not legal advice and may be refined over time.

BboyArena is a mixed-license project.

The project combines:
- open-source technical components;
- source-available official BboyArena applications;
- controlled official brand assets;
- open documentation/protocol material;
- future official hosted services and certified server infrastructure.

Public source code does not automatically grant permission to commercially exploit the BboyArena brand, official game, official ranked ecosystem, marketplace, certified servers, official events, or official community audience.

| Area | Intended scope | Current/Future license |
| --- | --- | --- |
| Generic technical game code | input, camera, joystick, state machine, helpers, reusable Three.js/React logic | Apache-2.0 or another permissive open-source license |
| Official BboyArena game app | playable local/offline BboyArena game implementation | source-available, free for local/offline/non-commercial use |
| Website | official community/cultural/brand website | source-available, no competing commercial clone in the same segment |
| Protocol/docs | federation protocol, server compatibility docs, technical specs | open documentation license, likely CC BY 4.0 or Apache-2.0 for code/schema |
| Server core | future Colyseus rooms and playable multiplayer core | intended to be playable; may use AGPL-3.0-or-later or another license when introduced |
| Official online services | ranked, auth, anti-cheat, analytics, matchmaking, payments, marketplace | proprietary/official hosted service |
| Open assets | demo assets, dummy characters, base animations, educational examples | open creative license, likely CC BY 4.0 |
| Official assets | BboyArena logo, official characters, official stages, brand visuals, marketplace premium assets | all rights reserved unless explicitly stated |

## Definitions

"Same segment" means breaking, breakdance, bboy/bgirl culture, hip-hop dance battles, cypher culture, street dance battles, and closely related hip-hop cultural uses such as DJing, MCing, or writing when used as part of a competing street-culture game/community ecosystem.

"Outside segment" means projects like samba, swing, lindy hop, gymnastics, skiing, curling, sledding, general sports, and rhythm/music games that do not compete with BboyArena's breaking/hip-hop street dance segment.

## Reuse Rule

Technical ideas and reusable generic code should be easy to reuse.

BboyArena's official identity, brand, ranked ecosystem and commercial audience must remain controlled.

## Colyseus

If Colyseus is used, Colyseus itself is MIT-licensed by its own authors. BboyArena policies apply only to BboyArena-specific code, configuration, brand, services, hosted infrastructure and project materials. They do not change the license of Colyseus itself.

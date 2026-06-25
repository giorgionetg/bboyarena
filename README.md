# BboyArena.org

![BboyArena banner](./apps/website/public/readme-banner.png)

*BboyArena is an early-stage open development project for breaking culture and a future 3D browser game. Today it includes the public website, project identity, legal/governance foundation and the first technical shell of the game, but not yet a playable prototype.*

**An open street culture project about breaking, creative movement, and a 3D browser game still in early development.**

This repository is the public home of the project. If you want to follow the build, save the repo, and stay close to future updates, this is the right place.

## Project status

BboyArena is currently early/pre-0.0.1.

The repository is public to support learning, transparency and community collaboration while the project is still taking shape.

At the moment, BboyArena is not a playable game and should not be presented as an MVP. The current `apps/game` package contains only the early standalone shell of the future game: menus, UI experiments, placeholder scenes and technical groundwork.

The current goal is to keep the monorepo simple, protect the official identity early, stabilize the public website, and build toward a first local/offline playable prototype.


## What exists today

BboyArena is not a playable game yet.

The repository currently contains:

* the public website;
* the project identity, manifesto, legal and governance material;
* the early standalone game shell;
* menu/UI experiments;
* placeholder scenes;
* technical groundwork for a future browser-based 3D breaking game;
* documentation for the intended architecture and direction.

There is currently no complete gameplay loop, no character controller, no battle system, no scoring system, no multiplayer mode and no finished playable prototype.

The goal of this phase is to build the public foundation of the project while progressively moving toward a first local/offline playable prototype.


## Licensing model

BboyArena uses a mixed-license strategy:

- an open technical core for reusable generic code;
- source-available official game and website work;
- controlled official brand, assets, ranked ecosystem, marketplace, certified servers and commercial use;
- open protocol and documentation material where appropriate.

Local, offline and non-commercial use is intended to be free. Generic technical components are intended to become permissive/open where they are clearly separated from official BboyArena identity and services.

See [legal/LICENSE-SCOPE.md](./legal/LICENSE-SCOPE.md).

## Commercial use

The public source code does not automatically grant permission to commercially exploit the BboyArena brand, official game, ranked ecosystem, marketplace, certified servers, official events or official community audience.

Commercial use in the breaking/bboy/bgirl/hip-hop street dance segment, official server certification, large sponsor work and use of BboyArena brand assets require approval.

See [legal/COMMERCIAL-USE.md](./legal/COMMERCIAL-USE.md), [legal/TRADEMARKS.md](./legal/TRADEMARKS.md) and [legal/SERVER-CERTIFICATION.md](./legal/SERVER-CERTIFICATION.md).

## Contributing

BboyArena is community-driven and founder-led. Substantial contributions should be discussed before work starts, so contributors do not waste time and the project roadmap stays coherent.

See [legal/CONTRIBUTING.md](./legal/CONTRIBUTING.md) and [legal/CLA.md](./legal/CLA.md).

## Governance

BboyArena is intended as a founder-led certified ecosystem: community proposals, mods, events, servers and contributions are welcome, while final authority over roadmap, brand, licensing, official ranked, marketplace, server certification, official events and monetization remains with the founder/project lead unless explicitly changed later.

See [legal/GOVERNANCE.md](./legal/GOVERNANCE.md) and [ROADMAP.md](./ROADMAP.md).

## What this project is

BboyArena is a work-in-progress built around breaking culture, urban energy, and a raw graffiti-and-concrete visual identity.

At this stage, the game is not yet an MVP and should not be treated as a finished installable app. The current focus is on shaping the project surface, sharing progress, and preparing the foundation for future versions.

## Why follow it now

- to keep an eye on the project from the beginning;
- to save or star the repo and come back later;
- to receive development updates, version notes, and content drops as they appear;
- to support the project while it is still taking shape;
- to help define the direction before the first playable release.

## The best ways to support the project

If you want to help, the most useful actions right now are:

- star the repository;
- watch the repo if you want update notifications;
- share the project with people who care about breaking, street culture, or indie browser games;
- join the Discord when the link is available or configured;
- send feedback on the identity, wording, and overall direction;
- report anything that feels unclear or broken in the public surface;
- follow the project so you can try the PWA once it becomes the main way to stay updated.

## About the PWA

The Progressive Web App is planned as the first convenient way to stay close to the project once it is ready for public use.

That means:

- faster access on mobile;
- a more app-like experience in the browser;
- a practical way to follow development changes;
- easier access to versions, updates, and new content.

For now, treat the PWA as part of the roadmap, not as a finished promise.

## Current direction

The project is being shaped around a few core ideas:

- a strong street-level visual language;
- a browser-first setup;
- a community-driven identity;
- a clean public surface for updates and future releases;
- a space where development, culture, and marketing can grow together.

## Indie and AI-assisted

BboyArena is currently being handled as a solo independent project.

I use LLM tools heavily in the workflow, and I am completely fine with suggestions, editorial help, ideation, and content support coming from either local models or paid services.

The important part is alignment:

- keep the visual direction consistent;
- follow the project tone;
- reuse the same prompt base when possible;
- make sure the generated content feels like the same world, not a mix of unrelated styles.

This is a vibe-based project, so the tools can change, but the shared aesthetic and content foundations should stay coherent.

## Roadmap

This roadmap is intentionally high-level and may change as the project evolves.

### 1. Public presence

- keep the public website stable;
- make the project easy to follow;
- publish clear progress updates;
- prepare the project for community sharing.

### 2. First playable foundation

- define the first MVP scope;
- establish the gameplay loop;
- validate the core controls and camera flow;
- keep the experience understandable on desktop and mobile.

### 3. PWA and updates

- ship the installable experience when it is ready;
- use the PWA as a lightweight update channel;
- surface version changes and new content clearly;
- make it easier for players to return.

### 4. Community and growth

- strengthen the Discord and social loop;
- gather feedback from real users;
- share devlogs, notes, and future plans;
- build a repeatable release rhythm.

## How to talk about the project

If you need short copy for sharing the repo or describing the project:

- **BboyArena is an early-stage breaking culture project with a street-inspired visual identity and a browser-first future.**
- **An open project for breaking fans, creative movement, and indie browser game development.**
- **A public work-in-progress built to grow with the community.**

## Marketing assets

- Banner: [`apps/website/public/readme-banner.png`](./apps/website/public/readme-banner.png)
- App icon: [`apps/website/public/icon.png`](./apps/website/public/icon.png)
- PWA icons: [`apps/website/public/android-chrome-192x192.png`](./apps/website/public/android-chrome-192x192.png), [`apps/website/public/android-chrome-512x512.png`](./apps/website/public/android-chrome-512x512.png)

## Technical backup

If you need the more developer-oriented documentation, see:

- [`README.backup.md`](./README.backup.md)

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

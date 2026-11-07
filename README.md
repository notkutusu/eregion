<p align="center">
  <img src="assets/logo.jpg" alt="Eregion logo" width="180"/>
</p>

<h1 align="center">Eregion</h1>

<p align="center">
  <a href="https://github.com/notkutusu/eregion/stargazers"><img src="https://img.shields.io/github/stars/notkutusu/eregion?style=flat-square" alt="Stars"/></a>
  <a href="https://github.com/notkutusu/eregion/issues"><img src="https://img.shields.io/github/issues/notkutusu/eregion?style=flat-square" alt="Issues"/></a>
  <a href="https://github.com/notkutusu/eregion/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs welcome"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT license"/></a>
  <a href="https://www.notkutusu.com"><img src="https://img.shields.io/badge/notkutusu.com-student%20notes-0F1A22?style=flat-square" alt="Not Kutusu"/></a>
</p>

<p align="center">
  TypeScript helpers for student calculations from the makers of
  <a href="https://www.notkutusu.com">Not Kutusu</a>.
</p>

---

## Why "Eregion"?

In Tolkien's world, **Eregion** (Hollin) was the elven land of great craft. There, Celebrimbor and the Gwaith-i-Mírdain shaped works that others could use for a long time.

This repository follows that idea. We forge small, reliable tools for students. Other apps (and your own site) can use them without dragging in a full product stack.

> *"Celebrimbor wants another tool at the forge."*
> When you open a PR, you are answering that call.

## What is Eregion?

Eregion is a public TypeScript package of **student calculation helpers**.

Typical tools (coming soon) look like:

- grade and exam calculators
- study math helpers
- other small, pure functions students actually need

Each tool should be:

| Rule | Meaning |
| --- | --- |
| Pure | Same input → same output |
| Typed | Clear TypeScript types |
| Small | Easy to read, test, and review |

**Not Kutusu** ([notkutusu.com](https://www.notkutusu.com)) is a student platform for lecture notes, past exams, and instructor feedback. Our main product apps stay private. Eregion is the open workshop we share with everyone.

## Install

```bash
yarn add @notkutusu/eregion
```

```bash
npm install @notkutusu/eregion
```

## Usage

```ts
import { /* toolName */ } from "@notkutusu/eregion";

const result = toolName({ /* inputs */ });
```

Use Eregion inside your own UI (React, Vue, plain HTML, anything). This package does the math. You own the screens.

[Not Kutusu](https://www.notkutusu.com) (our Shire web app) consumes this package the same way.

## Project layout

```text
eregion/
  assets/          # logo and static files
  src/             # tool source (TypeScript)
  CONTRIBUTING.md  # how to help
  README.md        # you are here
```

## Contributing

Pull requests are welcome from everyone.

1. Fork (or branch)
2. Add or improve a pure calculation tool
3. Open a PR to `master`
4. Get **at least one approval**
5. Merge

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before you start.

## Related

- Website: [notkutusu.com](https://www.notkutusu.com)
- Organization: [github.com/notkutusu](https://github.com/notkutusu)

## License

[MIT](LICENSE)

---

<p align="center">
  <em>Crafted in the spirit of Eregion. Built for students by Not Kutusu.</em>
</p>

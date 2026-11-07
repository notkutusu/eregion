# Contributing to Eregion

Thank you for helping at the forge. Celebrimbor would approve.

## How to contribute

1. Fork the repository (or use a branch if you have write access).
2. Create a branch from `master`.
3. Make your change. Keep tools pure: TypeScript only, no UI, no network, no database.
4. Open a pull request against `master`.
5. Wait for at least **one approving review**.
6. After approval, a maintainer merges the PR.

## Rules for tools

- Calculation and validation logic only
- No React, no HTTP clients, no environment secrets
- Clear types and small, testable functions
- Document the public API in the README when you add a tool

## Pull requests

- Use a clear title and a short description
- One focused change per PR when possible
- Link related issues if they exist

Everyone is welcome to open a PR. Direct pushes to `master` are blocked for non-admin contributors.

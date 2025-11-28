---
description:
globs:
alwaysApply: true
---

# Description

This project is monorepo based on Turborepo lib. Repository splittied into
packages into _apps/_ for applications and services and _lib/_ for common shared
code, like libraries and tooling, _docs/_ for project documentation. Each
package has it's own dependecies.

# Infrastructure

- _NPM_ is used as package manager
- Project is built with _Turborepo_ over _NPM_ Workspaces\_
- Turborepo cli is used to run scripts described in _turbo.json_

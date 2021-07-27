# Modules <!-- omit in toc -->

[Main Page](../README.md)
- [Introduction](#introduction)
  - [Core module features](#core-module-features)
  - [Summary](#summary)
- [Export - Import](#export---import)
- [Dynamic Imports](#dynamic-imports)

## Introduction

### Core module features

- Always “use strict”
- Module-level scope
- A module code is evaluated only the first time when imported, and other importers use the export from first time
- import.meta: contains the information about the current module.
  - eg: import.meta.url gives url path
- In a module, “this” is undefined: global this is not available

### Summary

- A module is a file. To make import/export work, browsers need \<script type="module">. Modules have several differences:
  - Deferred by default.
  - Async works on inline scripts.
  - To load external scripts from another origin (domain/protocol/port), CORS headers are needed.
  - Duplicate external scripts are ignored.
- Modules have their own, local top-level scope and interchange functionality via import/export.
- Modules always use strict.
- Module code is executed only once. Exports are created once and shared between importers.


When we use modules, each module implements the functionality and exports it. Then we use import to directly import it where it’s needed. The browser loads and evaluates the scripts automatically.

In production, people often use bundlers such as Webpack to bundle modules together for performance and other reasons.

## Export - Import

https://javascript.info/import-export

## Dynamic Imports

https://javascript.info/modules-dynamic-imports


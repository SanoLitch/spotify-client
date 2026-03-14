---
name: turborepo
description: Guidance on managing Turborepo pipelines, tasks, and caching. Use when modifying `turbo.json`, adding new workspace tasks, or optimizing build and test pipelines across the monorepo.
---

# Turborepo Expert

This skill provides operational guidance for managing our Turborepo setup. It ensures that pipelines are efficient, caching is leveraged correctly, and workspace dependencies are respected.

## Task Architecture

Our `turbo.json` follows a specific pattern for task naming and dependency management:

- **`pipeline:*`**: Meta-tasks that aggregate work or represent a stage (e.g., `pipeline:build`). These should have `cache: true` and defined `outputs`.
- **`build`**: Standard build task. Usually depends on `pipeline:build` and topological dependencies (`^build`).
- **`test:*`**: Granular test tasks (e.g., `test:back`, `test:front`). 
- **`start:*`**: Development server tasks. Usually `cache: false` and `persistent: true`.

### Dependency Patterns

- Use `^task-name` to depend on the same task in workspace dependencies.
- Use `^pipeline:build` to ensure all dependencies are built before running the current task.
- For application-specific tasks, use the `with` property:
  ```json
  "test:back": {
    "dependsOn": ["^pipeline:build"],
    "with": ["backend#test"]
  }
  ```

## Common Workflows

### 1. Adding a New Workspace Task
When adding a new script to a `package.json` in a workspace:
1. Identify if it needs to be part of a global pipeline.
2. Update the root `turbo.json` with the task definition.
3. Define `inputs` (e.g., `"$TURBO_DEFAULT$", ".env*"`) to ensure correct cache invalidation.
4. Define `outputs` if the task produces files (e.g., `dist/**`, `coverage/**`).

### 2. Optimizing Cache
If a task is running slowly or not caching when it should:
- Verify `inputs` include all necessary source files but exclude noise (like `node_modules`).
- Ensure `outputs` correctly capture the result of the task.
- Check if environment variables affecting the output are listed in `globalEnv` or task `inputs`.

### 3. Debugging Cache Misses
Run tasks with `--summarize` to see why cache was invalidated. Look for:
- Unexpected file changes in `inputs`.
- Changed environment variables.
- Missing `outputs` from dependency tasks.

## Best Practices
For detailed optimization strategies and advanced patterns, see [references/best-practices.md](references/best-practices.md).

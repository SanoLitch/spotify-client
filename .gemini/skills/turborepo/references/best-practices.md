# Turborepo Best Practices

This guide details optimization strategies and advanced patterns for our Turborepo setup.

## 1. Caching Strategies

### Caching Tests
Tests should generally be cached if they are deterministic. To enable caching for tests:
1. Ensure `cache: true` is set for the `test` task in `turbo.json`.
2. Define proper `inputs` (e.g., `src/**`, `test/**`).
3. Define `outputs` if the test produces reports (e.g., `coverage/**`, `junit.xml`).
4. Set `persistent: false`.

### Fine-Grained Inputs
Avoid using generic inputs if possible. Be specific to reduce unnecessary cache invalidations.
- **Good**: `"inputs": ["src/**/*.ts", "tsconfig.json"]`
- **Bad**: `"inputs": ["**/*"]`

## 2. Environment Variables
Turborepo needs to know about environment variables that affect task output to correctly invalidate the cache.

- Use the `globalEnv` property in `turbo.json` for variables that affect all tasks.
- Use task-level `inputs` or `env` for task-specific variables.
- Example: `"inputs": ["$TURBO_DEFAULT$", ".env.production"]`

## 3. Task Dependencies
- **Topological Dependencies (`^`)**: Use when a task depends on the same task being completed in its dependencies. Common for `build` or `lint`.
- **Pipeline Stages**: Use meta-tasks like `pipeline:build` to decouple your task graph. This makes it easier to reason about when things run.

## 4. Working with `with` (Application Specifics)
The `with` property allows you to map global `turbo` tasks to specific scripts in certain workspaces without cluttering every workspace's `package.json`.

```json
"test:front": {
  "dependsOn": ["^pipeline:build"],
  "with": ["frontend#test"],
  "cache": true,
  "persistent": false
}
```

## 5. Avoiding Circular Dependencies
Turborepo will error if there is a circular dependency in the task graph. If you find yourself needing a task that depends on itself, reconsider the task structure or split the task into multiple stages.

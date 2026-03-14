/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'domain-is-pure',
      comment: 'Domain layer (stores, logic) must not depend on any other application layer (ui, app, ext, lib).',
      severity: 'error',
      from: { path: '^src/([^/]+)/domain/.+' },
      to: {
        path: '^src/$1/(ui|app|ext|lib)/.+'
      }
    },
    {
      name: 'app-only-depends-on-domain',
      comment: 'Application layer (app) must not depend on UI (ui) or external infrastructure (ext).',
      severity: 'error',
      from: { path: '^src/([^/]+)/app/.+' },
      to: {
        path: '^src/$1/(ui|ext)/.+'
      }
    },
    {
      name: 'ui-presentation-purity',
      comment: 'UI components should only depend on Use Cases or Domain stores. Direct API (ext) or Ports (app) access is forbidden.',
      severity: 'error',
      from: { path: '^src/([^/]+)/ui/.+' },
      to: {
        path: '^src/$1/(ext|app)/.+'
      }
    },
    {
      name: 'lib-is-stateless-and-pure',
      comment: 'Utility layer (lib) must not depend on logic from other layers.',
      severity: 'error',
      from: { path: '^src/([^/]+)/lib/.+' },
      to: {
        path: '^src/$1/(api|app|domain|ext|ui)/.+'
      }
    },
    {
      name: 'slices-interact-via-public-api',
      comment: 'Slices should only depend on public exports (index.ts) of other slices, not internals.',
      severity: 'error',
      from: { path: '^src/([^/]+)/.+' },
      to: {
        path: '^src/([^/]+)/.+',
        pathNot: [
          '^src/$1/.+', // self
          '^src/[^/]+/index\.ts$', // public api
          '^src/shared/.+' // global shared
        ]
      }
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    tsConfig: {
      fileName: 'tsconfig.json'
    }
  }
};

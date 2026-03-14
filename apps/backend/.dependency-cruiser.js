/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'domain-is-pure',
      comment: 'Domain layer must not depend on any other application layer (api, app, ext, lib).',
      severity: 'error',
      from: { path: '^src/[^/]+/domain/.+' },
      to: {
        path: '^src/[^/]+/(api|app|ext|lib)/.+'
      }
    },
    {
      name: 'app-only-depends-on-domain',
      comment: 'Application layer (app) must not depend on external infrastructure (ext) or presentation (api).',
      severity: 'error',
      from: { path: '^src/[^/]+/app/.+' },
      to: {
        path: '^src/[^/]+/(api|ext)/.+'
      }
    },
    {
      name: 'api-not-depend-on-ext',
      comment: 'Presentation layer (api) should orchestrate via Use Cases and not directly talk to infrastructure (ext).',
      severity: 'error',
      from: { path: '^src/[^/]+/api/.+' },
      to: {
        path: '^src/[^/]+/ext/.+'
      }
    },
    // {
    //   name: 'lib-is-stateless-and-pure',
    //   comment: 'Utility layer (lib) must not depend on logic from other layers.',
    //   severity: 'error',
    //   from: { path: '^src/[^/]+/lib/.+' },
    //   to: {
    //     path: '^src/[^/]+/(api|app|domain|ext)/.+'
    //   }
    // },
    {
      name: 'no-cross-module-internal-imports',
      comment: 'Modules must interact via Public APIs or Event Bus, not by reaching into internals of other modules.',
      severity: 'error',
      from: { path: '^src/([^/]+)/.+' },
      to: {
        path: '^src/([^/]+)/.+',
        pathNot: ['^src/$1/.+', '^src/shared/.+']
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

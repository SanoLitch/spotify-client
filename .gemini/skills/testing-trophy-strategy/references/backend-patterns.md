# Backend Testing Patterns (Testing Trophy)

Practical guide for writing clean and maintainable tests in NestJS.

## 1. Test Co-location
Keep spec files exactly next to the tested code.
```text
/auth/domain/
  ├── login.use-case.ts
  └── login.use-case.spec.ts  <-- Close to the source
```

## 2. Mock and Fixture Extraction
Do NOT keep large JSON objects or complex mock definitions inside the `.spec.ts` file. Move them to a `test/fixtures/` or `lib/test-fixtures/` folder within the module.

**Bad (Inside spec):**
```typescript
const mockTrack = { id: '1', name: 'Song', album: { ... }, artists: [ ... ], ... 50 more lines };
```

**Good (Imported):**
```typescript
import { trackFixture } from '../test/fixtures/track.fixture';
// Now use trackFixture in your tests
```

## 3. Centralized Test Setup (No Boilerplate)
Instead of repeating `Test.createTestingModule` in every test, use a centralized factory or utility class (e.g., `test/test-utils.ts` on the app level).

**Centralized Utility Example:**
```typescript
export const createTestApp = async (overrides: Record<string, any> = {}) => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  })
  .overrideProvider(ExternalApi).useValue(overrides.externalApi || { ... })
  .compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
};
```

**Usage in Spec:**
```typescript
import { createTestApp } from '../../test/test-utils';

describe('LoginUseCase', () => {
  let app;
  beforeAll(async () => {
    app = await createTestApp(); // Clean and dry
  });
});
```

## 4. Integration Test Focus (CORE)
- Use **In-Memory Repositories** or a **Docker-based DB** for the database.
- Mock ONLY what is truly external (3rd party APIs, external queues).
- Use `Supertest` for hitting the real controllers to get maximum confidence.

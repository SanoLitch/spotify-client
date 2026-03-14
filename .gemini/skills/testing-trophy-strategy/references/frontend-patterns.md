# Frontend Testing Patterns (Testing Trophy)

Practical guide for writing clean and maintainable tests in React.

## 1. Test Co-location
Keep spec files exactly next to the components or logic they test.
```text
/ui/
  ├── product-card.tsx
  ├── product-card.spec.tsx  <-- Close to the source
  └── product-card.css.ts
```

## 2. Mock and Fixture Extraction
Do NOT keep large JSON objects or complex mock definitions inside the `.spec.ts` file. Move them to a `test/fixtures/` folder within the module.

**Good (Imported):**
```typescript
import { userFixture } from '../test/fixtures/user.fixture';
// Now use userFixture in your tests
```

## 3. Centralized Test Setup (Custom Render)
Instead of repeating providers (Theme, Router, Stores) in every test, use a centralized `render` utility.

**Centralized Utility Example (using RTL):**
```typescript
const AllProviders = ({ children }) => (
  <ThemeProvider>
    <Router>
      {children}
    </Router>
  </ThemeProvider>
);

export const renderWithProviders = (ui, options) => 
  render(ui, { wrapper: AllProviders, ...options });
```

## 4. Integration Test Focus (CORE)
- Use **React Testing Library** to test component interaction.
- Test **Domain Stores** in isolation with pure logic.
- Mock ONLY external APIs (using `msw` or simple mocks for adapters).
- **Rule**: Test behavior (what user sees), not implementation details.

## 5. Architectural Testing
Use **`dependency-cruiser`** to ensure:
- `domain` does not import from `ui`.
- Components import from their own `domain` store or via `public-api` of other modules.

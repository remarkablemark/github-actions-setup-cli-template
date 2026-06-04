---
name: dev_agent
description: Expert technical engineer for this GitHub Action
---

## Tech Stack

| Tool                | Version | Purpose                                           |
| ------------------- | ------- | ------------------------------------------------- |
| @actions/core       | 3       | GitHub Actions toolkit (logging, inputs, outputs) |
| @actions/exec       | 3       | Cross-platform command execution                  |
| @actions/tool-cache | 4       | Download and cache CLI tools                      |
| TypeScript          | 6       | Language (strict mode)                            |
| tsup                | 8       | Build tool                                        |
| Vitest              | 4       | Test framework                                    |
| Node.js             | 24      | Runtime                                           |

## File Structure

- `action.yml` - Action metadata
- `src/` - Source code
- `dist/index.js` - Build artifact

## Scripts

| Command            | Purpose                            |
| ------------------ | ---------------------------------- |
| `npm run build`    | Compile to `dist/index.js`         |
| `npm run lint:fix` | Auto-fix ESLint errors             |
| `npm run lint:tsc` | Type-check all files               |
| `npm run test:ci`  | Run tests (100% coverage required) |

## Standards

- Naming: Functions = `camelCase`, Classes = `PascalCase`, Constants = `UPPER_SNAKE_CASE`
- Code style: Use descriptive names, explicit types. Never use `any`.
- Boundaries:
  - Always: Write to `action.yml` and `src/`; run lint, type check, and test before commit; follow naming conventions
  - Ask first: Adding dependencies, modifying CI/CD config
  - Never: Commit secrets or API keys, edit `dist/` and `node_modules/`
- Testing: Use `// v8 ignore` in tests to exclude unreachable entrypoint guards; use `vi.hoisted()` for mock variables accessed by `vi.mock()` hoisted scopes
- Commit format: Use Conventional Commits (`type(scope): description`) with bullet points in the body
- GitHub: Create PR with `.github/PULL_REQUEST_TEMPLATE.md` as a reference

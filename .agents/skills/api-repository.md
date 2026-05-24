---
name: api-repository
description: Scaffold a new API repository layer for a given entity. Generates the abstract repository class, typed DTOs in a dedicated dtos/ subfolder, and a TanStack React Query hook — all following the project's existing network layer patterns. Usage: /project:api-repository <EntityName>
---

# Generate API Repository

Create a new API repository for the entity: **$ARGUMENTS**

## Step 1 — Read the reference files

Before writing any code, read these files to understand the exact patterns this project uses:

- `src/network/repository/AccountRepository.ts`
- `src/network/hooks/useAccountRepository.ts`
- `src/network/repository/RepositoryWithCache.ts`
- `src/network/endpoints/endpoints.ts`

## Step 2 — Derive identifiers from the entity name

Use `$ARGUMENTS` as the PascalCase entity name. If the input already ends with "Repository", strip that suffix first.

| Identifier | Rule | Example (`$ARGUMENTS` = `Transaction`) |
|---|---|---|
| Entity name | `$ARGUMENTS` as-is | `Transaction` |
| Repository class | `{Name}Repository` | `TransactionRepository` |
| Hook function | `use{Name}Repository` | `useTransactionRepository` |
| Opts type | `{Name}RepositoryOpts` | `TransactionRepositoryOpts` |
| Build-query fn | `buildQueryRepository{Name}` | `buildQueryRepositoryTransaction` |
| Repository folder | `src/network/repository/{Name}Repository/` | `src/network/repository/TransactionRepository/` |
| DTOs folder | `src/network/repository/{Name}Repository/dtos/` | `src/network/repository/TransactionRepository/dtos/` |
| Hook file | `src/network/hooks/use{Name}Repository.ts` | `src/network/hooks/useTransactionRepository.ts` |
| URL segment | lowercase, plural, kebab-case | `transactions` |

For multi-word names (e.g. `TransactionCategory`), apply kebab-case to the URL segment and pluralize the last word (e.g. `transaction-categories`).

## Step 3 — Create the repository folder and DTOs

Create the following files:

### `src/network/repository/{Name}Repository/dtos/List{Name}sItemResponseDto.ts`

Export a single interface named `List{Name}sItemResponseDto` with fields appropriate for the entity:
- Always include `id: string`
- Add 3–5 domain-relevant fields inferred from the entity name (e.g. for `Transaction`: `description`, `amount`, `date`, `type`, `categoryId`)
- Use `string` for identifiers and text, `number` for monetary amounts, `string` (ISO format) for dates

```ts
export interface List{Name}sItemResponseDto {
  id: string
  // ... domain-relevant fields
}
```

### `src/network/repository/{Name}Repository/dtos/{Name}Params.ts`

Export a single interface named `{Name}Params` with optional query parameters. Include date filters (`startDate?: string`, `endDate?: string`) when the entity is time-based (e.g. Transaction, Report, Entry). Always include pagination fields:

```ts
export interface {Name}Params {
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}
```

### `src/network/repository/{Name}Repository/dtos/index.ts`

Re-export everything from the DTO files:

```ts
export * from './List{Name}sItemResponseDto.ts'
export * from './{Name}Params.ts'
```

### `src/network/repository/{Name}Repository/{Name}Repository.ts`

Import the DTOs from `./dtos/index.ts` and declare the abstract class:

```ts
import type { List{Name}sItemResponseDto, {Name}Params } from './dtos/index.ts'

export abstract class {Name}Repository {
  abstract getAll(params?: {Name}Params): Promise<List{Name}sItemResponseDto[]>
  abstract getById(id: string): Promise<List{Name}sItemResponseDto>
}
```

Add additional abstract methods only if the entity strongly implies them from the domain.

## Step 4 — Create the React Query hook

Create `src/network/hooks/use{Name}Repository.ts` following the exact structure of `useAccountRepository.ts`:

1. **Imports**
   - `import { useQuery } from '@tanstack/react-query'`
   - `import { Endpoints } from '../endpoints/endpoints.ts'`
   - `import type { {Name}Repository, ... } from '../repository/{Name}Repository/{Name}Repository.ts'`
   - `import type { List{Name}sItemResponseDto, {Name}Params } from '../repository/{Name}Repository/dtos/index.ts'`
   - `import type { RepositoryWithCache } from '../repository/RepositoryWithCache.ts'`
   - All relative imports **must** end in `.ts`
   - Use `import type` for all type-only imports

2. **`{Name}RepositoryOpts` type** — maps each method name to its extra argument tuple:
   - Method with no args → `[]`
   - Method with args → `[{ argName: argType, ... }]`

3. **`buildQueryRepository{Name}` function** — takes `(method: keyof {Name}Repository, opts: unknown[])`:
   - One `case` per method with `{ queryKey, queryFn }`
   - Use `enabled: !!id` when a method requires an `id`
   - Add `default: return undefined` as the last arm

4. **`use{Name}Repository` hook** (the only export):
   ```ts
   export function use{Name}Repository<K extends keyof {Name}Repository>(
     method: K,
     ...opts: {Name}RepositoryOpts[K]
   ): RepositoryWithCache<{Name}Repository>[K] {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const { data, isLoading, refetch } = useQuery(
       buildQueryRepository{Name}(method, opts as unknown[]) as any,
     )
     return { data, isLoading, retry: refetch } as RepositoryWithCache<{Name}Repository>[K]
   }
   ```

## Style rules (apply to all generated files)

- No semicolons
- Single quotes for strings
- Trailing commas in multi-line structures
- 2-space indentation
- Max 100 characters per line
- DTOs are `interface` (not `type` or `class`)
- Abstract class uses `abstract` keyword on each method (no method bodies)

## Step 5 — Confirm output

After creating all files, list the created paths and confirm there are no obvious TypeScript errors (mismatched identifiers, missing imports, wrong extensions).

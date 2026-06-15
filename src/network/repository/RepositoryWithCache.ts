export type CacheResult<T> = {
  isLoading: boolean
  retry: () => void
  data: T | undefined
}

export type MutationResult<TVariables, TData = void> = {
  mutate: (variables: TVariables) => void
  mutateAsync: (variables: TVariables) => Promise<TData>
  isPending: boolean
  error: Error | null
  reset: () => void
}

// Phantom type — used as return type in abstract repositories to mark mutation methods
export type Mutation<TVariables = void, TData = void> = {
  readonly _tag: 'Mutation'
  readonly _variables: TVariables
  readonly _data: TData
}

type ExtractAsyncReturn<F> = F extends (...args: never[]) => Promise<infer R> ? R : never

export type RepositoryWithCache<T> = {
  [K in keyof T as T[K] extends (...args: never[]) => Promise<unknown> | Mutation<unknown, unknown>
    ? K
    : never]: T[K] extends (...args: never[]) => Mutation<infer V, infer D>
    ? MutationResult<V, D>
    : CacheResult<ExtractAsyncReturn<T[K]>>
}

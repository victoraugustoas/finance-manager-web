export type CacheResult<T> = {
  isLoading: boolean
  retry: () => void
  data: T | undefined
}

type ExtractAsyncReturn<F> = F extends (...args: any[]) => Promise<infer R> ? R : never

export type RepositoryWithCache<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => Promise<any> ? K : never]: CacheResult<
    ExtractAsyncReturn<T[K]>
  >
}

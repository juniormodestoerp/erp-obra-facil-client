export type WithStatus<T> = T & { statusToResolve?: 'pending' | 'error' }

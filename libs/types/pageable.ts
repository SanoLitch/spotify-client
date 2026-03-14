export interface Pageable<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

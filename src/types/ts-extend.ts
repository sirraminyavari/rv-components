export type FlattenArray<T> = T extends unknown[] ? T[number] : T;

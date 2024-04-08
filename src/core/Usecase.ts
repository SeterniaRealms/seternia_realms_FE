export interface IUsecase<T = unknown> {
  execute: (...params: any[]) => Promise<T>;
}

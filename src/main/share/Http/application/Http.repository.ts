import { AsyncResp, Props } from "../domain/types/TypeAliases";

export const I_HTTP_REPOSITORY = 'I_HTTP_REPOSITORY';

export interface HttpRepository {

  curryGET: <T>(_: Props) => (fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>;

  curryPost: <T>(_: Props) => (fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>;

  curryPut: <T>(_: Props) => (fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>;

  curryDelete: <T>(_: Props) => (fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>;

}

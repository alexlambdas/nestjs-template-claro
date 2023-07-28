import { AsyncResp, PropsType } from "../../domain/types/Common.type";

export const I_HTTP_REPOSITORY = 'I_HTTP_REPOSITORY';

export interface HttpRepository {

  GET: <T>(_: PropsType) => AsyncResp<T>;

  POST: <T>(_: PropsType) => AsyncResp<T>;

  PUT: <T>(_: PropsType) => AsyncResp<T>;

  DELETE: <T>(_: PropsType) => AsyncResp<T>;

}

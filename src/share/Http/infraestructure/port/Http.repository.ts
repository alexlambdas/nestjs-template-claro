import { AsyncResp, PropsType } from "../../domain/types/Common.type";

export const I_HTTP_REPOSITORY = 'I_HTTP_REPOSITORY';

export interface HttpRepository {

  GET: <T1>(_: PropsType) => AsyncResp<T1>;

  POST: <T1>(_: PropsType) => AsyncResp<T1>;

  PUT: <T1>(_: PropsType) => AsyncResp<T1>;

  DELETE: <T1>(_: PropsType) => AsyncResp<T1>;

}

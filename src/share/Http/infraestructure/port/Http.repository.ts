import { AsyncResp, PropsType } from "../../domain/types/Common.type";

export const I_HTTP_REPOSITORY = 'I_HTTP_REPOSITORY';

export interface HttpRepository {

  read: <T1>(_: PropsType) => AsyncResp<T1>;

  create: <T1>(_: PropsType) => AsyncResp<T1>;

  update: <T1>(_: PropsType) => AsyncResp<T1>;

  delete: <T1>(_: PropsType) => AsyncResp<T1>;

}

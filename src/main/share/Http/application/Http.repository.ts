import { HttpPropertiesType } from "../domain/types/CommonTypes.types";

export const I_HTTP_REPOSITORY = 'I_HTTP_REPOSITORY';

export interface HttpRepository {

  curryGET:     <T>(_: HttpPropertiesType) => (fx: (_: HttpPropertiesType) => Promise<T>) => Promise<T>;
  curryPost:    <T>(_: HttpPropertiesType) => (fx: (_: HttpPropertiesType) => Promise<T>) => Promise<T>;
  curryPut:     <T>(_: HttpPropertiesType) => (fx: (_: HttpPropertiesType) => Promise<T>) => Promise<T>;
  curryDelete:  <T>(_: HttpPropertiesType) => (fx: (_: HttpPropertiesType) => Promise<T>) => Promise<T>;

}
import { PropertiesType } from "../domain/types/Types.types";

export const I_HTTP_REPOSITORY = 'I_HTTP_REPOSITORY';

export interface HttpRepository {

  curryGET: <T>(_: PropertiesType) => (fx: (_: PropertiesType) => Promise<T>) => Promise<T>;
  //post: <T>(props: PropertiesType) => (fx: (props: PropertiesType) => Promise<T>) => Promise<T>;
  //put: <T>(props: PropertiesType) => (fx: (props: PropertiesType) => Promise<T>) => Promise<T>;
  //delete: <T>(props: PropertiesType) => (fx: (props: PropertiesType) => Promise<T>) => Promise<T>;

}
import { PropertiesType } from "../domain/types/CustomTypes.types";

export const I_CUSTOM_HTTP_REPOSITORY = 'I_CUSTOM_HTTP_REPOSITORY';

export interface CustomHttpRepository {

  get: <T>(props: PropertiesType) => (fx: (props: PropertiesType) => Promise<T>) => Promise<T>;
  //post: <T>(props: PropertiesType) => (fx: (props: PropertiesType) => Promise<T>) => Promise<T>;
  //put: <T>(props: PropertiesType) => (fx: (props: PropertiesType) => Promise<T>) => Promise<T>;
  //delete: <T>(props: PropertiesType) => (fx: (props: PropertiesType) => Promise<T>) => Promise<T>;

}
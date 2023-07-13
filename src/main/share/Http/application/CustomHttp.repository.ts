import { PropertiesType } from "../domain/types/CustomTypes.types";

export const I_CUSTOM_HTTP_REPOSITORY = 'I_CUSTOM_HTTP_REPOSITORY';

export interface CustomHttpRepository {

  get: <OutputType>(properties: PropertiesType) => Promise<OutputType>;
  post: <OutputType>(properties: PropertiesType) => Promise<OutputType>;
  put: <OutputType>(properties: PropertiesType) => Promise<OutputType>;
  delete: <OutputType>(properties: PropertiesType) => Promise<OutputType>;

}
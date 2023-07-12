import { HttpPropertiesType } from "../domain/types/CustomTypes.types";

export const I_CUSTOM_HTTP_REPOSITORY = 'I_CUSTOM_HTTP_REPOSITORY';

export interface CustomHttpRepository {

  get: <OutputType>(httpPropertiesType: HttpPropertiesType) => Promise<OutputType>;
  post: <OutputType>(httpPropertiesType: HttpPropertiesType) => Promise<OutputType>;
  put: <OutputType>(httpPropertiesType: HttpPropertiesType) => Promise<OutputType>;
  delete: <OutputType>(httpPropertiesType: HttpPropertiesType) => Promise<OutputType>;

}
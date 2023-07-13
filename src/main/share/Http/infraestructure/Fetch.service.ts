import { Injectable } from "@nestjs/common";
import { CustomHttpCatchException } from "../application/CustomHttpCatch.exception";
import { PropertiesType } from "../domain/types/CustomTypes.types";
import fetch from "cross-fetch";

@Injectable()
export class FetchService {

  async customFetch<OutputType>(httpProperties: PropertiesType): Promise<OutputType> {
    const { url, properties } = httpProperties;
    try {
      return (await fetch(url, properties)).json();
    }
    catch (err) {
      throw new CustomHttpCatchException({ code: 500, description: String(err) });
    }
  }
}
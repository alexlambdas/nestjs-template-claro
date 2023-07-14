import { Injectable } from "@nestjs/common";
import { CustomHttpCatchException } from "../application/CustomHttpCatch.exception";
import { PropertiesType } from "../domain/types/CustomTypes.types";
import fetch from "cross-fetch";

@Injectable()
export class FetchService {

  async customFetch<OutputType>(properties: PropertiesType): Promise<OutputType> {
    const { url, httpProperties } = properties;
    try {
      return (await fetch(url, httpProperties)).json();
    }
    catch (err) {
      throw new CustomHttpCatchException({ code: 500, description: String(err) });
    }
  }
}
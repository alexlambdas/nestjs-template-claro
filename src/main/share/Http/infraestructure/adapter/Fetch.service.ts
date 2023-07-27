import { Injectable } from "@nestjs/common";
import { AsyncResp, FunctionFetch, PropsType, ResponseType } from "../../domain/types/Common.type";
import fetch from "cross-fetch";

@Injectable()
export class FetchService{

  private fetchCall: FunctionFetch;

  constructor(){

    this.fetchCall = async <T1,T2>(props: PropsType): AsyncResp<T1 | T2> => {
      try {

        const { url, properties } = props;
        const response = await fetch(url, properties);
    
        const fetchOut: ResponseType<T1> = {
          ok: response.ok,
          statusCode: response.status,
          statusText: response.statusText,
          data: await response.json(),
        };
    
        return fetchOut;
    
      }
      catch (err: any) {
    
        const fetchOut: ResponseType<T2> = {
          ok: false,
          statusCode: 500,
          statusText: 'Internal Server Error',
          data: String(err),
        };
    
        return fetchOut;
      }
    }
  }

  getFunctionFetchCall = () => this.fetchCall;
}
import { AsyncResp, PropsType, ResponseType } from "../../domain/types/Common.type";

//
async function timeOutHttp<T>(miliseconds: number): AsyncResp<T> {

  async function timeOutHttp(): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
  }

  await timeOutHttp();

  const fetchOut: ResponseType<T> = {
    ok: false,
    statusCode: 408,
    statusText: 'Request Timeout',
    data: `Timeout de ${miliseconds/1000} segundos`,
  };

  return fetchOut;
}

//
function curryHttpCall<T>(props: PropsType): ((fx: (_: PropsType) => AsyncResp<T>) => AsyncResp<T>) {

  const { timeout } = props;
  const fy = timeOutHttp;

  return async function (fx) {
    return Promise
      .race([fy<string>(timeout), fx(props)])
      .then(value => value)

  }
}

export default {
  timeOutHttp,
  curryHttpCall,
}
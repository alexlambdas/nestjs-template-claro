import { HttpPropertiesType } from "../domain/types/CommonTypes.types";
//import fetch from "cross-fetch";

//
async function httpCall<T>(httpProperties: HttpPropertiesType): Promise<T> {
  const { url, props } = httpProperties;
  return (await fetch(url, props)).json();
}

function transformObjectToStringQuery<T>(obj: T): string{
  
  let result: string = '?';
  const objArray = Object.entries(obj);
  const length: number = objArray.length;

  for(let index = 0; index < length; index++){

    if(index === length-1){
      const objKey = objArray[index];
      result += `${objKey[0]}=${objKey[1]}`;
    }
    else{
      const objKey = objArray[index];
      result += `${objKey[0]}=${objKey[1]}&`;
    }
  }

  return result;

}

export default {
  httpCall,
  transformObjectToStringQuery,
}
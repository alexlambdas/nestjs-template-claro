import { HttpException } from "@nestjs/common";
import { HttpCatchException } from "../../../../main/share/Http/application/HttpCatch.exception";
import { HttpCatchExceptionType, HttpExceptionType } from "../../../../main/share/Http/domain/types/CommonTypes.types";

describe('HttpCatchException', () => {

  //
  let numberOfTests = 0;

  //
  it(`test #${++numberOfTests}`, async () => {

    const httpCatchExceptionType: HttpCatchExceptionType = {
      description: "string with error description",
      code: 55
    };

    const httpExceptionType: HttpExceptionType = {
      response: "string with error description",
      status: 55
    };

    const responseFault = new HttpException(httpExceptionType.response, httpExceptionType.status);

    

    expect(new HttpCatchException(httpCatchExceptionType)).toEqual(responseFault);
  })
  
})
import { FaultDto } from "../domain/dtos/Fault.dto";
import { errorObjectPropertiesType } from "../domain/types/CommonTypes.types";

//
function reduceMessage(prev: string, current: string): string {
  return `${prev} && ${current}`
}

//
function createErrorObject(objProperties: errorObjectPropertiesType): FaultDto{

  const {internalFault, urlApi, fnReduceMessage} = objProperties;

  return {
    fault: {
      transactionId: undefined,
      timeStamp: (new Date()).toISOString(),
      httpStatusCode: internalFault.statusCode,
      message: "error",
      layer: "CONTROLLER",
      urlApi: urlApi,
      urlBackend: process.env.NODE_ENV_HTTP_URL_BACK_END,
      detailException: {
        systemErrorHandler: "openshift",
        originSystemError: "openshift",
        originSystemErrorCode: (internalFault.statusCode).toString(),
        originSystemErrorMessage: internalFault.error,
        originSystemErrorDescription: Array.isArray(internalFault.message) ? (
          internalFault.message.reduce(fnReduceMessage)
        ) : (
          internalFault.message
        ),
      }
    }
  };
}

export default {
  reduceMessage,
  createErrorObject,
}
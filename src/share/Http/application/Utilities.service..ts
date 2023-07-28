import { LoggerType, LoggerSuccessType } from "../domain/types/Common.type";
import { ConfigAppService } from "./ConfigApp.service";

//
function getTimeZone(date: Date): string{

  const gmtZuluDate = date;
  const year = gmtZuluDate.getFullYear();
  const month = gmtZuluDate.getMonth();
  const day = gmtZuluDate.getDate();
  const hours = gmtZuluDate.getHours() - 5;
  const minutes = gmtZuluDate.getMinutes();
  const seconds = gmtZuluDate.getSeconds();
  const gmt05Date = new Date(year, month, day, hours, minutes, seconds);

  //
  return gmt05Date.toISOString().split(".")[0];
}

function buildLoggerType(configApp: ConfigAppService): LoggerType{

  const timeInit: number = configApp.getTimeInit();
  const timeEnd: number = configApp.getTimeEnd();

  return{
    applicationName: configApp.getApplicationName(),
    methodName: configApp.getMethodName(),
    verb: configApp.getVerb(),
    transactionId: configApp.getTransactionId(),
    level: configApp.getLevelInfo(),
    layer: configApp.getLayerConnectivity(),
    message: configApp.getMessageSuccess(),
    processingTime: (timeEnd-timeInit)/1000,
    timestamp: getTimeZone(new Date()),
    urlApi: configApp.getUrlApi(),
    urlBackend: configApp.getUrlBackend(),
    request: configApp.getPayloadRequest(),
    response: configApp.getPayloadResponse(),
  }
}

function loggerSuccess(props: LoggerSuccessType): void{ 

  props.configApp.setTimeEnd(Date.now());
  props.configApp.setPayloadResponse(props.bodyOut);

  const loggerVO: LoggerType = buildLoggerType(props.configApp);
  const childLogger: any = props.logger.child(loggerVO);
  childLogger.info(loggerVO.message);
}

export default {
  getTimeZone,
  loggerSuccess,
}
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
class DetailExceptionDto {

  @ApiProperty()
  systemErrorHandler: string;

  @ApiProperty()
  originSystemError: string;

  @ApiProperty()
  originSystemErrorCode: string;

  @ApiProperty()
  originSystemErrorMessage: string;

  @ApiProperty()
  originSystemErrorDescription: any;
}

/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
class FaultExceptionDto {

  @ApiPropertyOptional()
  transactionId?: string;

  @ApiProperty()
  timeStamp: string;

  @ApiProperty()
  httpStatusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  layer: string;

  @ApiProperty()
  urlApi: string;

  @ApiProperty()
  urlBackend: string;

  @ApiProperty({ type: DetailExceptionDto })
  detailException: DetailExceptionDto;

}


/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
export class FaultDto {

  @ApiProperty({ type: FaultExceptionDto })
  fault: FaultExceptionDto;
}



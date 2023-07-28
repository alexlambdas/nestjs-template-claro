import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
class DetailFaultDto {

  @ApiProperty()
  @IsNotEmpty()
  statusCode: number;

  @ApiProperty()
  @IsNotEmpty()
  error: string;

  @ApiProperty()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  layer: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  applicationName: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  transactionId?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  urlApi?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  urlBackend?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  backendApplicationName?: string;

  @ApiProperty()
  @IsNotEmpty()
  backendResponse: string | object;
}


/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
export class FaultDto {

  @ApiProperty({ type: DetailFaultDto })
  fault: DetailFaultDto;
}



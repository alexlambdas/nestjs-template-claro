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

  @ApiProperty()
  @IsNotEmpty()
  transactionId?: string;

  @ApiProperty()
  @IsNotEmpty()
  urlApi?: string;

  @ApiProperty()
  @IsNotEmpty()
  urlBackend?: string;

  @ApiProperty()
  @IsNotEmpty()
  backendResponse: string | any;
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



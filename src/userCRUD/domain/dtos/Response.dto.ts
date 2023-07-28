import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty } from "class-validator";

/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
export class ResponseDto<T> {

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  ok: boolean;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  statusCode: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  statusText: string;

  @ApiProperty({ type: Object})
  @IsDefined()
  @IsNotEmpty()
  data: T[] | T | string | object;
}
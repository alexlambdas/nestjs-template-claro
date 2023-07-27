import { IsDefined, IsNotEmpty } from "class-validator";

/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
export class ResponseDto<T> {

  @IsDefined()
  @IsNotEmpty()
  ok: boolean;

  @IsDefined()
  @IsNotEmpty()
  statusCode: number;

  @IsDefined()
  @IsNotEmpty()
  statusText: string;

  @IsDefined()
  @IsNotEmpty()
  data: T[] | T | string | any;
}
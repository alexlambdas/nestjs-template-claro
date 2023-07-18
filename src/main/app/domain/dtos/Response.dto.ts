import { IsDefined, IsNotEmpty } from "class-validator";
import { PayloadUserDto } from "./User.dto";


export class ResponseDto {

  @IsDefined()
  @IsNotEmpty()
  statusCode: number;

  @IsDefined()
  @IsNotEmpty()
  statusMessage: string;

  @IsDefined()
  @IsNotEmpty()
  descriptionMessage: string;

  @IsDefined()
  @IsNotEmpty()
  response: PayloadUserDto[];
}
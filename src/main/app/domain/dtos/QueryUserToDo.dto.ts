import { IsDefined, IsNotEmpty } from "class-validator";

export class QueryUserToDo {

  @IsDefined()
  @IsNotEmpty()
  id: number;
}
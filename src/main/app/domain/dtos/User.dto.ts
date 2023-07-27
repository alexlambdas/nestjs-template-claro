import { IsDefined, IsNotEmpty } from "class-validator";

/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
export class QueryUserDto{

  @IsDefined()
  @IsNotEmpty()
  id: number;
}

/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
class GeoDto{

  @IsDefined()
  @IsNotEmpty()
  lat: string;

  @IsDefined()
  @IsNotEmpty()
  lng: string;
}

/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
class AddressDto{

  @IsDefined()
  @IsNotEmpty()
  street: string;

  @IsDefined()
  @IsNotEmpty()
  suite: string;

  @IsDefined()
  @IsNotEmpty()
  city: string;

  @IsDefined()
  @IsNotEmpty()
  zipcode: string;

  @IsDefined()
  @IsNotEmpty()
  geo: GeoDto;
}

/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
class CompanyDto{

  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  catchPhrase: string;

  @IsDefined()
  @IsNotEmpty()
  bs: string;
}

/**
 * 
 * @descirption
 * data transfer object (DTO) in Domain Layer
 * 
 */
export class UserDto{

    @IsDefined()
    @IsNotEmpty()
    id: number;

    @IsDefined()
    @IsNotEmpty()
    name: string;

    @IsDefined()
    @IsNotEmpty()
    username: string;

    @IsDefined()
    @IsNotEmpty()
    email: string;

    @IsDefined()
    @IsNotEmpty()
    address: AddressDto;

    @IsDefined()
    @IsNotEmpty()
    phone: string;

    @IsDefined()
    @IsNotEmpty()
    website: string;

    @IsDefined()
    @IsNotEmpty()
    company: CompanyDto;
}


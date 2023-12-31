import Ajv from "ajv/dist/2020";
import { JSONSchemaType } from "ajv";
import { UserType } from "../types/User.type";

const UserSchema: JSONSchemaType<UserType> = {
  type: 'object',
  properties:{
    id: {type: 'integer'},
    name: {type: 'string'},
    username: {type: 'string'},
    email: {type: 'string'},
    address: {
      type: 'object',
      properties:{
        street: {type: 'string'},
        suite: {type: 'string'},
        city: {type: 'string'},
        zipcode: {type: 'string'},
        geo:{
          type: 'object',
          properties:{
            lat: {type: 'string'},
            lng: {type: 'string'},
          },
          required:['lat','lng'],
          additionalProperties: false,
        }
      },
      required:['street','suite','city','zipcode','geo'],
      additionalProperties: false,
    },
    phone: {type: 'string'},
    website: {type: 'string'},
    company:{
      type: 'object',
      properties:{
        name: {type: 'string'},
        catchPhrase: {type: 'string'},
        bs: {type: 'string'},
      },
      required:['name','catchPhrase','bs'],
      additionalProperties: false,
    }
  },
  required:['id','name','username','email','address','phone','website','company'],
  additionalProperties: false,
};

const fnUserSchemaErrorValidation = new Ajv().compile(UserSchema);

export { fnUserSchemaErrorValidation }
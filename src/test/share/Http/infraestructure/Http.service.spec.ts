import { Test } from "@nestjs/testing";
import { PropertiesType } from "../../../../main/share/Http/domain/types/Types.types";
import { HttpService } from "../../../../main/share/Http/infraestructure/Http.service";
import { HttpConfigAppService } from "../../../../main/share/Http/application/HttpConfigApp.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ConfigService } from "@nestjs/config";
import Fetch from "../../../../main/share/Http/application/Features";

describe('CustomHttpService', () => {

  //
  let http: HttpService;
  let configApp: HttpConfigAppService;
  let numberOfTest: number = 0;

  //
  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      providers: [
        HttpService,
        HttpConfigAppService,
        ConfigService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {}
        }
      ]
    }).compile();

    http = moduleRef.get<HttpService>(HttpService);
    configApp = moduleRef.get<HttpConfigAppService>(HttpConfigAppService);
  })
  
  //
  it(`test #${++numberOfTest} :: function fetchData :: normal case`, async () => {

    const properties: PropertiesType = {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      timeout: 5000,
      transactionId: '61e03b60-1244-4bd3-8f8b-ddb453cbde32',
      httpProperties: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    };

    type User = {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    };

    const responseUser: User = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    };

    async function fetchCustomMock(props: PropertiesType): Promise<any>{
      return responseUser;
    };

    const response: User = await (Fetch.curryFetch<User>(properties))(fetchCustomMock);
    
    expect(response).toEqual(responseUser);

  })
  
  //
  it(`test #${++numberOfTest} :: function fetchData :: error case`, async () => {

    const httpProperties: PropertiesType = {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      timeout: Number.MIN_VALUE,
      transactionId: '61e03b60-1244-4bd3-8f8b-ddb453cbde32',
      httpProperties: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    };

    type User = {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    };

    const responseUser: User = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    };

    const customFetchMock = async function(httpProperties: PropertiesType): Promise<any>{
      return new Promise((resolve,_) => setTimeout(() => resolve(responseUser),10));
    };
    
    expect(async () => await (Fetch.curryFetch<User>(httpProperties))(customFetchMock)).rejects.toThrow(Error);

  })

  //
  it(`test #${++numberOfTest} :: function get :: normal case`, async () => {

    const properties: PropertiesType = {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      timeout: 5000,
      transactionId: '61e03b60-1244-4bd3-8f8b-ddb453cbde32',
      httpProperties: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    };

    type User = {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    };

    const responseUser: User = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    };

    async function fetchCustomMock(props: PropertiesType): Promise<any>{
      return responseUser;
    };

    const response: User = await (http.curryGET<User>(properties))(fetchCustomMock);
    
    expect(response).toEqual(responseUser);

  })

})
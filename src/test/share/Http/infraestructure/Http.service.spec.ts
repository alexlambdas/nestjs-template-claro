import { Test } from "@nestjs/testing";
import { Props } from "../../../../main/share/Http/domain/types/TypeAliases";
import { HttpService } from "../../../../main/share/Http/infraestructure/Http.service";
import { ConfigApp } from "../../../../main/share/Http/application/ConfigApp.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ConfigService } from "@nestjs/config";
import Features from "../../../../main/share/Http/application/Features";

describe('CustomHttpService', () => {

  //
  let http: HttpService;
  let configApp: ConfigApp;
  let numberOfTest: number = 0;

  //
  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      providers: [
        HttpService,
        ConfigApp,
        ConfigService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {}
        }
      ]
    }).compile();

    http = moduleRef.get<HttpService>(HttpService);
    configApp = moduleRef.get<ConfigApp>(ConfigApp);
  })
  
  //
  it(`test #${++numberOfTest} :: function fetchData :: normal case`, async () => {

    const properties: Props = {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      timeout: 5000,
      properties: {
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

    async function fetchCustomMock(props: Props): Promise<any>{
      return responseUser;
    };

    const response: User = await (Features.curryHttpCall<User>(properties))(fetchCustomMock);
    
    expect(response).toEqual(responseUser);

  })
  
  //
  it(`test #${++numberOfTest} :: function fetchData :: error case`, async () => {

    const httpProperties: Props = {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      timeout: Number.MIN_VALUE,
      properties: {
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

    const customFetchMock = async function(httpProperties: Props): Promise<any>{
      return new Promise((resolve,_) => setTimeout(() => resolve(responseUser),10));
    };
    
    expect(async () => await (Features.curryHttpCall<User>(httpProperties))(customFetchMock)).rejects.toThrow(Error);

  })

  //
  it(`test #${++numberOfTest} :: function get :: normal case`, async () => {

    const properties: Props = {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      timeout: 5000,
      properties: {
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

    async function fetchCustomMock(props: Props): Promise<any>{
      return responseUser;
    };

    const response: User = await (http.curryGET<User>(properties))(fetchCustomMock);
    
    expect(response).toEqual(responseUser);

  })
})
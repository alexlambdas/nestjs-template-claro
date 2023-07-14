import { Test } from "@nestjs/testing";
import { PropertiesType } from "../../../../main/share/Http/domain/types/CustomTypes.types";
import { CustomHttpService } from "../../../../main/share/Http/infraestructure/CustomHttp.service";
import { FetchService } from "../../../../main/share/Http/infraestructure/Fetch.service";

describe('CustomHttpService', () => {

  //
  let customFetch: FetchService;
  let http: CustomHttpService;

  //
  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      providers: [
        FetchService,
        CustomHttpService,
      ]
    }).compile();

    customFetch = moduleRef.get<FetchService>(FetchService);
    http = moduleRef.get<CustomHttpService>(CustomHttpService);
  })
  
  //
  it('test #1 :: function fetchData :: normal case', async () => {

    const httpProperties: PropertiesType = {
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

    const fetchMock = async function(httpProperties: PropertiesType): Promise<any>{
      return responseUser;
    };

    const response: User = await (http.fetchData<User>(httpProperties))(fetchMock);
    
    expect(response).toEqual(responseUser);

  })
  
  //
  it('test #2 :: function fetchData :: error case', async () => {

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
    
    expect(async () => await (http.fetchData<User>(httpProperties))(customFetchMock)).rejects.toThrow(Error);

  })

})
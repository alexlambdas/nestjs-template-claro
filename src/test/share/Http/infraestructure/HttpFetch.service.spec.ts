import { Test } from "@nestjs/testing";
import { FetchPropertiesType } from "../../../../src/main/share/domain/types/CustomTypes.types";
import { HttpFetchService } from "../../../main/share/Http/infraestructure/httpFetch.service"

describe('HttpFetchService', () => {

  //
  let httpFetchService: HttpFetchService;

  //
  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      providers: [HttpFetchService]
    }).compile();

    httpFetchService = moduleRef.get<HttpFetchService>(HttpFetchService);
  })

  //
  it('test :: function customFetch :: normal case', async () => {

    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';

    const properties: FetchPropertiesType = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    
    const finalResult = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    }

    const expectedResult = await httpFetchService.customFetch(url,properties);

    expect(expectedResult).toEqual(finalResult);

  })

  //
  it('test :: function customSetTimeOut :: normal case', async () => {

    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';

    const properties: FetchPropertiesType = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const timeout = 4000;
    
    const finalResult = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    }

    const customFetchAndTimeout = httpFetchService.customFetchAndTimeout(url, properties, timeout);
    const customFetch = httpFetchService.customFetch;

    expect(await (customFetchAndTimeout)(customFetch)).toEqual(finalResult);

  })

  //
  it('test :: function fetchData :: normal case', async () => {

    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';
    const timeout = 3000;

    const properties: FetchPropertiesType = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const finalResponse = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    };

    const fetchData = httpFetchService.fetchData(url,properties,timeout);
    const customFetch = httpFetchService.customFetch;

    expect(await (fetchData)(customFetch)).toEqual(finalResponse);
  })

  //
  it('test :: function fetchData :: normal case', async () => {

    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';
    const timeout = 3000;

    const properties: FetchPropertiesType = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const finalResponse = {
      "id":1,
      "firstName":"Virge",
      "lastName":"McCurdy",
      "carMakeId":1
    };
    
    const fetchData = httpFetchService.fetchData(url,properties,timeout);
    const customFetchMock = (url: string,properties: FetchPropertiesType) => finalResponse;

    expect(await (fetchData)(customFetchMock)).toEqual(finalResponse);
  })

  //
  it('test :: function fetchData :: error case', async () => {

    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';
    const timeout = 1;

    const properties: FetchPropertiesType = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const finalResponse: string = `timeout`;
    
    const fetchData = httpFetchService.fetchData(url,properties,timeout);
    const customFetch = httpFetchService.customFetch;

    expect(await (fetchData)(customFetch)).toBe(finalResponse);
  })

  //
  it('test :: function fetchData :: error case', async () => {

    const url: string = 'https://jsonplaceholderrr.typicode.com/todos/1';
    const timeout = 4000;

    const properties: FetchPropertiesType = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const finalResponse: string = `timeout`;
    
    const fetchData = httpFetchService.fetchData(url,properties,timeout);
    const customFetch = httpFetchService.customFetch;

    const response = await (fetchData)(customFetch);
    console.log(response.toString());

  })

})
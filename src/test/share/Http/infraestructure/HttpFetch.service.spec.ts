import { Test } from "@nestjs/testing";
import { HttpPropertiesType } from "../../../../main/share/Http/domain/types/CustomTypes.types";
import { CustomHttpService } from "../../../../main/share/Http/infraestructure/CustomHttp.service"

describe('HttpFetchService', () => {

  //
  let http: CustomHttpService;

  //
  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      providers: [CustomHttpService]
    }).compile();

    http = moduleRef.get<CustomHttpService>(CustomHttpService);
  })

  //
  it('test :: function customFetch :: normal case', async () => {

    type User = {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    };

    const finalResponse: User = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    };

    const httpProperties: HttpPropertiesType = {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      timeout: 5000,
      properties: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    };
    
    const response: User = await http.customFetch<User>(httpProperties);

    expect(response).toEqual(finalResponse);

  })

  //
  it('test :: funciton customFetchAndTimeout :: normal case', async () => {

    type PokemonSearch = {
      count: number;
      next: string;
      previous: string;
      results: [{ name: string, url: string}]
    };

    const finalResponse = {
      "count": 1281,
      "next": "https://pokeapi.co/api/v2/pokemon/?offset=2&limit=1",
      "previous": "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1",
      "results": [
        {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/"
        }
      ]
    };

    const httpProperties: HttpPropertiesType = {
      url: 'https://pokeapi.co/api/v2/pokemon/?offset=1&limit=1',
      timeout: 5000,
      properties: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    };

    const customFetchAndTimeout = http.customFetchAndTimeout(httpProperties);
    const customFetch = http.customFetch;
    const response: PokemonSearch = await (customFetchAndTimeout)(customFetch);

    expect(response).toEqual(finalResponse);

  })
})
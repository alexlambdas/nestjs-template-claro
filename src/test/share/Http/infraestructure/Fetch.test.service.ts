import { Test } from "@nestjs/testing";
import { PropertiesType } from "../../../../main/share/Http/domain/types/CustomTypes.types";
import { FetchService } from "../../../../main/share/Http/infraestructure/Fetch.service";


describe('FetchService', () => {

  //
  let http: FetchService;

  //
  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      providers: [FetchService]
    }).compile();

    http = moduleRef.get<FetchService>(FetchService);
  })
  
  //
  it('test :: success #1 :: function customFetch :: normal case', async () => {

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

    const httpProperties: PropertiesType = {
      url: 'https://pokeapi.co/api/v2/pokemon/?offset=1&limit=1',
      timeout: 5000,
      properties: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    };

    expect(await http.customFetch<PokemonSearch>(httpProperties)).toEqual(finalResponse);

  })
  
  
  

  //
  it('test :: error #1 :: function customFetch :: error case', async () => {

    type PokemonSearch = {
      count: number;
      next: string;
      previous: string;
      results: [{ name: string, url: string}]
    };

    const httpProperties: PropertiesType = {
      url: 'https://pokeapi.co/api/v2/pokemonn/?offset=1&limit=1',
      timeout: 5000,
      properties: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    };

    expect(async () => await http.customFetch<PokemonSearch>(httpProperties)).rejects.toThrow(Error);
  })

})
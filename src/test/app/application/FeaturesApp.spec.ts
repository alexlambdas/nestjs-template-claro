import FeaturesApp from "../../../main/app/application/Features";

describe('FeaturesApp', () => {

  //
  it('test #1 :: function transformObjectToStringQuery :: normal case', () => {

    type UserQueryType = {
      id?: number;
      first_name?: string;
      last_name?: string;
      gender?: string;
      language?: string;
      age?: number;
      country?: string;
      city?: string;
      car_make?: string;
      car_model_year?: number;
      currency_code?: string;
      favorite_color?: string;
      credit_card_type?: string;
    };

    const userQuery: UserQueryType = {
      first_name: 'Alex',
      last_name: 'Meza',
      age: 35,
    };

    const stringQuery: string = FeaturesApp.transformObjectToStringQuery<UserQueryType>(userQuery);
    const stringToBe: string = '?first_name=Alex&last_name=Meza&age=35';

    expect(stringQuery).toBe(stringToBe);
  })
})
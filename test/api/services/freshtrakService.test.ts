import * as freshtrakApiService from '../../../api/services/freshtrakApiService';
import { getFTLocationData } from '../../../api/services/freshtrakService';
import freshtrakLocationDto from '../../../api/models/freshtrakAPI/freshtrakLocationDto';

import SpyInstance = jest.SpyInstance;

describe('freshtrakService', () => {
  describe('.getFTLocationData', () => {
    let mockGetFreshTrakEvents: SpyInstance;

    beforeAll(() => {
      mockGetFreshTrakEvents = jest
      .spyOn(freshtrakApiService, 'getFreshTrakEvents')
      .mockResolvedValue(
        {
            agency: 
            {
                //name: 'Mid-Ohio Foodbank - Kroger Community Pantry',
                name: 'Mid-Ohio Foodbank - Kroger Community Pantry',
                events: [
                {
                    name: 'Drive Thru',
                    exception_note: '',
                    event_details: 'This is a drive thru distribution. Wear a mask and make sure your trunk is cleaned out. Please, no more than 5 families being served per vehicle, if it fits in your vehicle.',

                },

                ],
            },
        });
    });

    afterAll(() => {
      mockGetFreshTrakEvents.mockRestore();
    });


    it('returns FreshTrak data', async () => {
      const site_id = '4863';
      const zip = '43123';
    
      const FTLocationData: freshtrakLocationDto = await getFTLocationData(site_id, zip);

      expect(FTLocationData.zipURL).toEqual('https://freshtrak.com/events/list/43123');
      expect(FTLocationData.agencyURL).toEqual('https://freshtrak.com/agency/events/6');
      expect(FTLocationData.agencyName).toEqual('Mid-Ohio Foodbank - Kroger Community Pantry');
      expect(FTLocationData.events).toBeTruthy();
    });
  });
});

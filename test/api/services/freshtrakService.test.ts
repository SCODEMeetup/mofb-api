import * as freshtrakApiService from '../../../api/services/freshtrakApiService';
import { getFTLocationData } from '../../../api/services/freshtrakService';
import freshtrakLocationDto from '../../../api/models/freshtrakAPI/freshtrakLocationDto';

import SpyInstance = jest.SpyInstance;

describe('freshtrakService', () => {
  describe('.getFTLocationData', () => {
    let mockGetFreshTrakEvents: SpyInstance;

    beforeEach(() => {
      mockGetFreshTrakEvents = jest
        .spyOn(freshtrakApiService, 'getFreshTrakEvents')
        .mockResolvedValue({
          agency: {
            name: 'Mid-Ohio Foodbank - Kroger Community Pantry',
            events: [
              {
                name: 'Drive Thru',
                exception_note: '',
                event_details:
                  'This is a drive thru distribution. Wear a mask and make sure your trunk is cleaned out. Please, no more than 5 families being served per vehicle, if it fits in your vehicle.',
              },
            ],
          },
        });
    });

    afterEach(() => {
      mockGetFreshTrakEvents.mockRestore();
    });

    it('calls the freshtrakAPIService when the site_id maps to a FT agencyId', async () => {
      const siteId = '4863';
      const zip = '43123';
      const agencyId = 6;

      await getFTLocationData(siteId, zip);

      expect(freshtrakApiService.getFreshTrakEvents).toHaveBeenCalledWith(
        agencyId
      );
    });

    it("doesn't call the freshtrakAPIService when the site_id doesn't map to a FT agencyId", async () => {
      const siteId = '-9999';
      const zip = '43123';

      await getFTLocationData(siteId, zip);
      expect(freshtrakApiService.getFreshTrakEvents).toHaveBeenCalledTimes(0);
    });

    it('returns FreshTrak data', async () => {
      const siteId = '4863';
      const zip = '43123';

      const FTLocationData: freshtrakLocationDto = await getFTLocationData(
        siteId,
        zip
      );

      expect(FTLocationData.zipURL).toEqual(
        'https://freshtrak.com/events/list/43123'
      );
      expect(FTLocationData.agencyURL).toEqual(
        'https://freshtrak.com/agency/events/6'
      );
      expect(FTLocationData.agencyName).toEqual(
        'Mid-Ohio Foodbank - Kroger Community Pantry'
      );
      expect(FTLocationData.events).toBeTruthy();
    });
  });
});

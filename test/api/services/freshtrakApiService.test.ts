import request from 'request-promise';
import { getFreshTrakEvents } from '../../../api/services/freshtrakApiService';
import { FRESHTRAK_API_HOST } from '../../../api/utils/constants';
import SpyInstance = jest.SpyInstance;

describe('freshtrakApiService', () => {
  describe('.getFreshTrakEvents', () => {
    let mockGet: SpyInstance;
    beforeEach(() => {
      mockGet = jest.spyOn(request, 'get');
      mockGet.mockResolvedValue(
        JSON.stringify({
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
        })
      );
    });

    afterEach(() => {
      mockGet.mockRestore();
    });

    it('gets a freshtrak agency resource and returns a response object', async () => {
      const agencyId = 6;
      const url = `${FRESHTRAK_API_HOST}/api/agencies/${agencyId}`;
      const response = await getFreshTrakEvents(agencyId);
      const opts = {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'mofb-api',
        },
      };

      expect(mockGet).toHaveBeenCalledWith(url, opts);
      expect(response?.agency.name).toEqual(
        'Mid-Ohio Foodbank - Kroger Community Pantry'
      );
      expect(response?.agency.events[0].name).toEqual('Drive Thru');
    });
  });
});

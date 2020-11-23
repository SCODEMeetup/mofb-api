import request from 'request-promise';
import { getFreshTrakEvents } from '../../../api/services/freshtrakApiService';
import SpyInstance = jest.SpyInstance;

jest.mock('request-promise', () => {
  return {
    get: (uri: string): Promise<string> => {
      return Promise.resolve(
        JSON.stringify({
          uri,
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
    },
  };
});

describe('freshtrakApiService', () => {
  describe('.getFreshTrakEvents', () => {
    let get: SpyInstance;
    beforeEach(() => {
      get = jest.spyOn(request, 'get');
    });

    afterEach(() => {
      get.mockRestore();
    });

    it('gets a freshtrak agency resource and returns a response object', async () => {
      const agencyId = 6;
      const url = `https://pantry-finder-api.freshtrak.com/api/agencies/${agencyId}`;
      const response = await getFreshTrakEvents(agencyId);

      expect(get).toHaveBeenCalledWith(url);
      expect(response?.agency.name).toBe(
        'Mid-Ohio Foodbank - Kroger Community Pantry'
      );
      expect(response?.agency.events[0].name).toEqual('Drive Thru');
    });
  });
});

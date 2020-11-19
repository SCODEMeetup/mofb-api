import request from 'request-promise';
import { getFreshTrakEvents } from '../../../api/services/freshtrakApiService';
import { FRESHTRAK_API_HOST } from '../../../api/utils/constants';
import freshtrakResponseDto from '../../../api/models/freshtrakAPI/freshtrakResponseDto';

jest.mock('request-promise');

describe('freshtrakApiService', () => {
  describe('.getFreshTrakEvents', () => {
    it('gets a freshtrak agency resource and returns a response object', async () => {
      const get = jest.spyOn(request, 'get').mockResolvedValue(
        {
            agency: 
            {
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

      const agencyId = 6
      const url = `${FRESHTRAK_API_HOST}/api/agencies/${agencyId}`;
      const response: freshtrakResponseDto | null = await getFreshTrakEvents(agencyId);

      expect(get).toHaveBeenCalledWith(url);
      if (response)
        expect(response.agency.name).toEqual('Mid-Ohio Foodbank - Kroger Community Pantry');
      
      get.mockRestore();
    });
  });
});

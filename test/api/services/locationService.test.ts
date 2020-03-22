import * as SCOSService from '../../../api/services/scosService';
import { getLocations } from '../../../api/services/locationService';
import { AGENCIES_TABLE, CATEGORIES_TABLE } from '../../../api/utils/constants';

import SpyInstance = jest.SpyInstance;

describe('locationService', () => {
  describe('.getLocations', () => {
    let mockMakeSCOSRequest: SpyInstance;

    beforeAll(() => {
      mockMakeSCOSRequest = jest
        .spyOn(SCOSService, 'makeSCOSRequest')
        .mockResolvedValue([
          /* eslint-disable @typescript-eslint/camelcase */
          {
            site_id: '123',
            site_info: {
              site: [
                {
                  address: [
                    {
                      city: 'Columbus',
                      line1: '150 Oak St',
                      line2: 'Columbus',
                      line3: 'OH',
                      zip: '43220',
                    },
                  ],
                  name: 'Awesome Location',
                  latitude: '43.23498135',
                  longitude: '-45.9599555',
                  stgphones: [{ phone: '(614) 123-4567 Administrative' }],
                  stphones: [
                    { phone: '(614) 123-4568 Other' },
                    { phone: '(614) 123-4567 Administrative' },
                  ],
                },
              ],
              detailtext: [
                {
                  label: 'Hours',
                  text: 'M-F 12-5p',
                },
              ],
            },
          },
          /* eslint-enable @typescript-eslint/camelcase */
        ]);
    });

    afterAll(() => {
      mockMakeSCOSRequest.mockRestore();
    });

    it('makes a request to SCOS with a query', async () => {
      const category = '333';
      const limit = 100;
      const page = 1;

      const sqlQuery = `
  SELECT DISTINCT a.* FROM 
    ${AGENCIES_TABLE} a 
    JOIN ${CATEGORIES_TABLE} c ON a.taxonomy.category = c.category 
    CROSS JOIN UNNEST(c.subcat) AS subcat
  WHERE
    c.categoryid IN ('${category}') OR
    subcat.subcategoryid IN ('${category}')
  LIMIT ${limit}`;

      await getLocations([category], limit, page);

      expect(SCOSService.makeSCOSRequest).toHaveBeenCalledWith(sqlQuery);
    });

    it('returns a formatted list of locations', async () => {
      const category = '101';
      const limit = 350;
      const page = 1;

      const [location] = await getLocations([category], limit, page);

      expect(location.id).toEqual('123');
      expect(location.address1).toEqual('150 Oak St');
      expect(location.address2).toEqual('Columbus OH');
      expect(location.zipCode).toEqual('43220');
      expect(location.name).toEqual('Awesome Location');
      expect(location.phones).toEqual([
        '(614) 123-4567 Administrative',
        '(614) 123-4568 Other',
      ]);
      expect(location.handicapAccessFlag).toEqual('N');
      expect(location.hours).toEqual('M-F 12-5p');
      expect(location.lat).toEqual('43.23498135');
      expect(location.long).toEqual('-45.9599555');
    });
  });
});

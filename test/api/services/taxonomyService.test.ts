import * as SCOSService from '../../../api/services/scosService';
import { getSubcategories } from '../../../api/services/taxonomyService';
import { CATEGORIES_TABLE } from '../../../api/utils/constants';

import SpyInstance = jest.SpyInstance;

describe('taxonomyService', () => {
  describe('.getSubcategories', () => {
    let mockMakeSCOSRequest: SpyInstance;

    beforeAll(() => {
      mockMakeSCOSRequest = jest
        .spyOn(SCOSService, 'makeSCOSRequest')
        .mockResolvedValue([
          {
            category: 'test category',
            categoryid: 'test id',
            subcat: [
              {
                subcategory: 'test sub category',
                subcategoryid: 'test sub id',
                subcatterm: [
                  {
                    sterm: 'test sterm',
                  },
                ],
              },
            ],
          },
        ]);
    });

    afterAll(() => {
      mockMakeSCOSRequest.mockRestore();
    });

    it('makes a request to SCOS with a query', async () => {
      const category = '333';
      const sqlQuery = `SELECT subcat FROM ${CATEGORIES_TABLE} WHERE categoryid = '${category}'`;

      await getSubcategories(category);

      expect(SCOSService.makeSCOSRequest).toHaveBeenCalledWith(sqlQuery);
    });

    it('returns a formatted list of taxonomies', async () => {
      const category = '101';

      const [taxonomy] = await getSubcategories(category);

      expect(taxonomy.id).toEqual('test sub category');
      expect(taxonomy.description).toEqual('test sub category');
      expect(taxonomy.parentCategoryId).toEqual(category);
      expect(taxonomy.level).toEqual(2);
    });
  });
});

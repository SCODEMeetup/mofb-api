import * as SCOSService from '../../../api/services/scosService';
import { getHealth } from '../../../api/services/healthService';

import SpyInstance = jest.SpyInstance;

describe('healthService', () => {
  describe('.getHealth', () => {
    let mockMakeSCOSRequest: SpyInstance;

    beforeEach(() => {
      mockMakeSCOSRequest = jest
        .spyOn(SCOSService, 'makeSCOSRequest')
        .mockImplementation(() => Promise.resolve(true));
    });

    afterEach(() => {
      mockMakeSCOSRequest.mockRestore();
    });

    it('makes a request to SCOS with a query', async () => {
      await getHealth();

      expect(SCOSService.makeSCOSRequest).toHaveBeenCalledTimes(2);
    });

    it('returns a health status object', async () => {
      const { agenciesTableFine, categoriesTableFine } = await getHealth();

      expect(agenciesTableFine).toBeDefined();
      expect(categoriesTableFine).toBeDefined();
    });

    describe('when SCOS is down', () => {
      let mockMakeSCOSRequestDown: SpyInstance;

      beforeEach(() => {
        mockMakeSCOSRequestDown = jest
          .spyOn(SCOSService, 'makeSCOSRequest')
          .mockImplementation(() => {
            throw new Error('API is down');
          });
      });

      afterEach(() => {
        mockMakeSCOSRequestDown.mockRestore();
      });

      it('returns false for the statuses', async () => {
        const { agenciesTableFine, categoriesTableFine } = await getHealth();

        expect(agenciesTableFine).toEqual(false);
        expect(categoriesTableFine).toEqual(false);
      });
    });
  });
});

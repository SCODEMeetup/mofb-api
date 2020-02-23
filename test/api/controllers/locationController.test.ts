import LocationController from '../../../api/controllers/locationController';
import { getLocations } from '../../../api/services/locationService';

jest.mock('../../../api/services/locationService');

describe('LocationController', () => {
  describe('.getLocations', () => {
    it('calls the service for the locations', async () => {
      const category = '123';
      const limit = '250';
      const pageNumber = '2';

      await LocationController.getLocations(category, limit, pageNumber);

      expect(getLocations).toHaveBeenCalledWith(
        category,
        parseInt(limit, 10),
        parseInt(pageNumber, 10)
      );
    });
  });
});

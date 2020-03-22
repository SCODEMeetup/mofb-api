import LocationController from '../../../api/controllers/locationController';
import { getLocations } from '../../../api/services/locationService';

jest.mock('../../../api/services/locationService');

describe('LocationController', () => {
  const locationController = new LocationController();

  describe('.getLocations', () => {
    it('calls the service for the locations', async () => {
      const category1 = '123';
      const category2 = '345';
      const limit = '250';
      const pageNumber = '2';

      await locationController.getLocations(
        `${category1},${category2}`,
        limit,
        pageNumber
      );

      expect(getLocations).toHaveBeenCalledWith(
        [category1, category2],
        parseInt(limit, 10),
        parseInt(pageNumber, 10)
      );
    });
  });
});

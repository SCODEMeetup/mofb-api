import TaxonomyController from '../../../api/controllers/taxonomyController';
import { getSubcategories } from '../../../api/services/taxonomyService';

jest.mock('../../../api/services/taxonomyService');

describe('TaxonomyController', () => {
  const taxonomyController = new TaxonomyController();

  describe('.getSubcategories', () => {
    it('calls the service with an ID', async () => {
      const category = '123';

      await taxonomyController.getSubcategories(category);

      expect(getSubcategories).toHaveBeenCalledWith(category);
    });
  });
});

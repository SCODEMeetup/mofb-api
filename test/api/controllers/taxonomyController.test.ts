import request from 'supertest';
import app from '../../../api/server';
import { getSubcategories } from '../../../api/services/taxonomyService';

jest.mock('../../../api/services/taxonomyService');

beforeEach(() => {
  const getSubcategoriesMock = getSubcategories as jest.Mock;
  // doesn't matter what's returned, as long as it's not empty
  getSubcategoriesMock.mockResolvedValue('');
});

describe('/taxonomy', () => {
  describe('GET /:id/children', () => {
    it('calls the service with an ID', async () => {
      const category = '123';

      const result = await request(app).get(
        `/api/taxonomy/${category}/children`
      );

      expect(result.status).toEqual(200);
      expect(getSubcategories).toHaveBeenCalledWith(category);
    });
  });
});

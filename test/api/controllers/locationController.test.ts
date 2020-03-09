import request from 'supertest';
import app from '../../../api/server';
import { getLocations } from '../../../api/services/locationService';

jest.mock('../../../api/services/locationService');

beforeEach(() => {
  const getLocationsMock = getLocations as jest.Mock;
  // doesn't matter what's returned, as long as it's not empty
  getLocationsMock.mockResolvedValue('');
});

describe('/location', () => {
  describe('GET /', () => {
    it('calls the service for the locations', async () => {
      const category = '123';
      const limit = '250';
      const pageNumber = '2';

      const result = await request(app).get(
        `/api/location?taxonomyId=${category}&limit=${limit}&pageNumber=${pageNumber}`
      );

      expect(result.status).toEqual(200);
      expect(getLocations).toHaveBeenCalledWith(
        category,
        parseInt(limit, 10),
        parseInt(pageNumber, 10)
      );
    });
  });
});

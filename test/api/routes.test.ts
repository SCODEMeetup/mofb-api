import request from 'supertest';
import app from '../../api/server';
import { getHealth } from '../../api/services/healthService';
import { getLocations } from '../../api/services/locationService';
import { getSubcategories } from '../../api/services/taxonomyService';

jest.mock('../../api/services/healthService');
jest.mock('../../api/services/locationService');
jest.mock('../../api/services/taxonomyService');

describe('Routes', () => {
  const routes = [
    { route: '/api/health/status', serviceMethod: getHealth },
    {
      route: '/api/location?taxonomyId=Health%20Care&limit=500&pageNumber=1',
      serviceMethod: getLocations,
    },
    { route: '/api/taxonomy/1/children', serviceMethod: getSubcategories },
  ];

  Promise.all(
    routes.map(async ({ route, serviceMethod }) => {
      await it(`${route}`, async () => {
        const mock = serviceMethod as jest.Mock;
        // doesn't matter what's returned, as long as it's not empty
        mock.mockResolvedValue('');

        const result = await request(app).get(route);
        expect(result.status).toEqual(200);
      });
    })
  );
});

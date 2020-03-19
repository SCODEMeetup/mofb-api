import request from 'supertest';
import app from '../../api/server';

jest.mock('../../api/services/healthService');
jest.mock('../../api/services/locationService');
jest.mock('../../api/services/taxonomyService');

describe('Routes', () => {
  // eslint-disable-next-line no-underscore-dangle
  const routes = app._router.stack
    .map((x: any) => x.route?.path)
    .filter((x: string | undefined) => x);

  Promise.all(
    routes.map(async (route: any) => {
      await it(`${route}`, async () => {
        const result = await request(app).get(route);
        expect(result.status).toBeGreaterThanOrEqual(200);
        expect(result.status).toBeLessThanOrEqual(300);
      });
    })
  );
});

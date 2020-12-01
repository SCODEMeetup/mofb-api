import request from 'supertest';
import app from '../../api/server';

jest.mock('../../api/services/healthService');
jest.mock('../../api/services/locationService');
jest.mock('../../api/services/taxonomyService');

interface Route {
  route: {
    path?: string;
  };
}

describe('Routes', () => {
  // eslint-disable-next-line no-underscore-dangle
  const routes: string[] = app._router.stack
    .map((x: Route) => x.route?.path)
    .filter((x: string | undefined) => x);

  Promise.all(
    routes.map(async route => {
      await it(`${route}`, async () => {
        const result = await request(app).get(route);
        expect(result.status).toBeGreaterThanOrEqual(200);
        expect(result.status).toBeLessThanOrEqual(300);
      });
    })
  );
});

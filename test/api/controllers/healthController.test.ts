import request from 'supertest';
import app from '../../../api/server';
import { getHealth } from '../../../api/services/healthService';

jest.mock('../../../api/services/healthService');

beforeEach(() => {
  const getHealthMock = getHealth as jest.Mock;
  // doesn't matter what's returned, as long as it's not empty
  getHealthMock.mockResolvedValue('');
});

describe('HealthController', () => {
  describe('.getStatus', () => {
    it('calls the service', async () => {
      const result = await request(app).get('/api/health/status');
      expect(result.status).toEqual(200);
      expect(getHealth).toHaveBeenCalled();
    });
  });
});

import HealthController from '../../../api/controllers/healthController';
import { getHealth } from '../../../api/services/healthService';

jest.mock('../../../api/services/healthService');

describe('HealthController', () => {
  const healthController = new HealthController();

  describe('.getStatus', () => {
    it('calls the service', async () => {
      await healthController.getStatus();

      expect(getHealth).toHaveBeenCalled();
    });
  });
});

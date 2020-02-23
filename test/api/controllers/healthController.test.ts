import HealthController from '../../../api/controllers/healthController';
import { getHealth } from '../../../api/services/healthService';

jest.mock('../../../api/services/healthService');

describe('HealthController', () => {
  describe('.getStatus', () => {
    it('calls the service', async () => {
      await HealthController.getStatus();

      expect(getHealth).toHaveBeenCalled();
    });
  });
});

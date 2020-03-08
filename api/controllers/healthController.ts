import { Path, GET } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import HealthDto from '../models/dto/healthDto';
import { getHealth } from '../services/healthService';

@Path('/api/health')
@Tags('Health')
export default class HealthController {
  /**
   * Returns status of the API.
   */
  @GET
  @Path('/status')
  async getStatus(): Promise<HealthDto> {
    return getHealth();
  }
}

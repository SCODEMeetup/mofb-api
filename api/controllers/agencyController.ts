import { Path, GET, PathParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import AgencyDto from '../models/dto/agencyDto';
import { getAgencies } from '../services/agencyService';

@Path('/api/agency')
@Tags('Agency')
export default class AgencyController {
  /**
   * Returns Agencies.
   */
  @GET
  @Path('/:id/agency')
  async getSubcategories(@PathParam('id') id: string): Promise<AgencyDto[]> {
    return getAgencies(id);
  }
}
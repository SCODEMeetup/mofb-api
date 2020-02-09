import { Path, GET, QueryParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { getLocations } from '../services/locationService';
import LocationDto from '../models/dto/locationDto';

@Path('/api/location')
@Tags('Location')
export default class LocationController {
  /**
   * Returns a list of locations.
   */
  @GET
  async getLocations(
    @QueryParam('taxonomyId') taxonomyId: string,
    @QueryParam('agencyId') agencyId?: string,
    @QueryParam('limit') limit: string = '500',
    @QueryParam('pageNumber') pageNumber: string = '1'
  ): Promise<LocationDto[]> {
    const agencyIds = agencyId?.split(',') ?? null;
    // limit the results returned
    const limitInt = Math.min(500, parseInt(limit, 10));
    const pageNumberInt = parseInt(pageNumber, 10);
    return getLocations(taxonomyId, agencyIds, limitInt, pageNumberInt);
  }
}

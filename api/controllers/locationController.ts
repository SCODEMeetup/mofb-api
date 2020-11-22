import { GET, Path, QueryParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { getLocations } from '../services/locationService';
import LocationDto from '../models/dto/locationDto';

@Path('/api/location')
@Tags('Location')
export default class LocationController {
  /**
   * Returns a list of locations.
   * @param taxonomyId NOTE: this is a comma-separated list of category ids
   * @param limit
   * @param pageNumber
   */
  @GET
  async getLocations(
    @QueryParam('taxonomyId') taxonomyId: string = '',
    @QueryParam('limit') limit: string = '500',
    @QueryParam('pageNumber') pageNumber: string = '1'
  ): Promise<LocationDto[]> {
    const limitInt = parseInt(limit, 10) || 500;
    const pageNumberInt = parseInt(pageNumber, 10);
    const taxonomyIds = taxonomyId.split(',');
    return getLocations(taxonomyIds, limitInt, pageNumberInt);
  }
}

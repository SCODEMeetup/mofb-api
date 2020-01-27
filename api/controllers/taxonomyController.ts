import { Path, GET, PathParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import TaxonomyDto from '../models/dto/taxonomyDto';
import { getSubcategories } from '../services/taxonomyService';

@Path('/api/taxonomy')
@Tags('Taxonomy')
export default class TaxonomyController {
  /**
   * Returns status of the API.
   */
  @GET
  @Path('/:id/children')
  async getSubcategories(@PathParam('id') id: string): Promise<TaxonomyDto[]> {
    return getSubcategories(id);
  }
}

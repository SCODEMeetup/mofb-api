import { Path, GET, PathParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import TaxonomyDto from '../models/dto/taxonomyDto';
import { getSubcategories } from '../services/taxonomyService';

@Path('/api/taxonomy')
@Tags('Taxonomy')
export default class TaxonomyController {
  /**
   * Returns all subcategories of a given category id.
   * @param id Id of the parent category
   */
  @GET
  @Path('/:id/children')
  static async getSubcategories(
    @PathParam('id') id: string
  ): Promise<TaxonomyDto[]> {
    return getSubcategories(id);
  }
}

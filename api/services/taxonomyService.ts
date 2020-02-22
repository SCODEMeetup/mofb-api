import { NotFoundError } from 'typescript-rest/dist/server/model/errors';
import { makeSCOSRequest } from './scosService';
import getLogger from '../utils/logger';
import TaxonomyDto from '../models/dto/taxonomyDto';
import ScosSubcategoryDto from '../models/scosApi/scosSubcategoryDto';
import ScosCategoryDto from '../models/scosApi/scosCategoryDto';
import { CATEGORIES_TABLE } from '../utils/constants';

const log = getLogger('taxonomyService');

async function getSubcategories(id: string): Promise<TaxonomyDto[]> {
  log.debug(`Getting subcategories of category id ${id}`);

  const query = `SELECT subcat FROM ${CATEGORIES_TABLE} WHERE categoryid = '${id}'`;
  const response: Pick<ScosCategoryDto, 'subcat'>[] = await makeSCOSRequest(
    query
  );

  if (response?.length === 0) {
    throw new NotFoundError(`Invalid category id ${id}`);
  }

  return response[0].subcat.map(
    (subcat: ScosSubcategoryDto): TaxonomyDto => ({
      // ids aren't available in the agencies table, so we're just passing around the string for now
      id: subcat.subcategory,
      description: subcat.subcategory,
      parentCategoryId: id,
      // "categories" are level 1; "subcategories" are level 2
      level: 2,
    })
  );
}

export { getSubcategories };

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
      id: subcat.subcategoryid,
      description: subcat.subcategory,
      parentCategoryId: id,
      // TODO: hardcoded bc I'm not sure if this is still available in the data
      level: 1,
    })
  );
}

export { getSubcategories };

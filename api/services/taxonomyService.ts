import { makeSCOSRequest } from './scosService';
import getLogger from '../utils/logger';
import TaxonomyDto from '../models/dto/taxonomyDto';
import ScosSubcategoryDto from '../models/scosApi/scosSubcategoryDto';

const { CATEGORIES_TABLE } = process.env;

const log = getLogger('taxonomyService');

async function getSubcategories(id: string): Promise<TaxonomyDto[]> {
  log.debug(`Getting subcategories of category id ${id}`);
  const response: ScosSubcategoryDto[] = await makeSCOSRequest(`SELECT subcat FROM ${CATEGORIES_TABLE} WHERE categoryid = '${id}'`);
  return response.map((subcat: ScosSubcategoryDto): TaxonomyDto => ({
    id: subcat.subcategoryid,
    description: subcat.subcategory,
    parentCategoryId: id,
    // TODO: hardcoded bc I'm not sure if this is still available in the data
    level: 1,
  }));
}

export { getSubcategories };

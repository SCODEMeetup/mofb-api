import { makeSCOSRequest } from './scosService';
import getLogger from '../utils/logger';
import ScosCategoryDto from '../models/scosApi/scosCategoryDto';
import { AGENCIES_TABLE } from '../utils/constants';
import LocationDto from '../models/dto/locationDto';

const log = getLogger('locationService');

async function getLocations(
  taxonomyId: string,
  agencyIds: string[] | null,
  limit: number,
  pageNumber: number
): Promise<LocationDto[]> {
  log.debug(
    `Getting locations by taxonomy id: ${taxonomyId}; agencyIds: ${agencyIds}; limit: ${limit}; pageNumber: ${pageNumber}`
  );

  // const query = `SELECT * FROM ${AGENCIES_TABLE} LIMIT ${limit}`;
  // const response: Pick<ScosCategoryDto, 'subcat'>[] = await makeSCOSRequest(
  //   query
  // );
  // console.log('RESPONSE:', response);

  // TODO: return real values
  return [];
}

export { getLocations };

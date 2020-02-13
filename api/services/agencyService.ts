import { makeSCOSRequest } from './scosService';
import getLogger from '../utils/logger';
import AgencyDto from '../models/dto/AgencyDto';
import { AGENCIES_TABLE } from '../utils/constants';
import { NotFoundError } from 'typescript-rest/dist/server/model/errors';

const log = getLogger('agencyService');

async function getAgencies(id: string): Promise<AgencyDto[]> {
  log.debug(`Getting agencies with ID ${id}`);

  const query = `SELECT * FROM ${AGENCIES_TABLE} WHERE id = '${id}'`;
  const response: AgencyDto[] = await makeSCOSRequest(query);

  if (response?.length === 0) {
    throw new NotFoundError(`Invalid category ID ${id}`);
  }
  return response;
}

export { getAgencies };

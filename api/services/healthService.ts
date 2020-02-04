import { makeSCOSRequest } from './scosService';
import HealthDto from '../models/dto/healthDto';
import getLogger from '../utils/logger';
import { AGENCIES_TABLE, CATEGORIES_TABLE } from '../utils/constants';

const log = getLogger('healthService');

async function getHealth(): Promise<HealthDto> {
  let agenciesTableFine = false;
  let categoriesTableFine = false;
  try {
    await makeSCOSRequest(`SELECT 1 FROM ${AGENCIES_TABLE} LIMIT 1`);
    agenciesTableFine = true;
  } catch (err) {
    log.error(err);
  }
  try {
    await makeSCOSRequest(`SELECT 1 FROM ${CATEGORIES_TABLE} LIMIT 1`);
    categoriesTableFine = true;
  } catch (err) {
    log.error(err);
  }
  return {
    agenciesTableFine,
    categoriesTableFine,
  };
}

export { getHealth };

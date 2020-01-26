import { makeSCOSRequest } from './scosService';
import HealthDto from '../models/dto/healthDto';
import getLogger from '../utils/logger';

const { AGENCIES_TABLE, CATEGORIES_TABLE } = process.env;

const log = getLogger('healthService');

async function getHealth(): Promise<HealthDto> {
  let agenciesTableFine = false;
  let categoriesTableFine = false;
  try {
    await makeSCOSRequest(`SELECT 1 FROM ${AGENCIES_TABLE} LIMIT 1`);
    agenciesTableFine = true;
  } catch (err) {
    log.error(`Error requesting from agencies table: ${err}`);
  }
  try {
    await makeSCOSRequest(`SELECT 1 FROM ${CATEGORIES_TABLE} LIMIT 1`);
    categoriesTableFine = true;
  } catch (err) {
    log.error(`Error requesting from categories table: ${err}`);
  }
  return {
    agenciesTableFine,
    categoriesTableFine,
  };
}

export { getHealth };

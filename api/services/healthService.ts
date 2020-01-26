import { makeSCOSRequest } from './SCOSService';
import HealthDto from '../models/dto/healthDto';
import getLogger from '../utils/logger';

const { AGENCIES_TABLE, CATEGORIES_TABLE } = process.env;

const log = getLogger('healthService');

async function getHealth(): Promise<HealthDto> {
  let agenciesTableConnected = false;
  let categoriesTableConnected = false;
  try {
    await makeSCOSRequest(`SELECT 1 FROM ${AGENCIES_TABLE} LIMIT 1`);
    agenciesTableConnected = true;
  } catch (err) {
    log.error(`Error requesting from agencies table: ${err}`);
  }
  try {
    await makeSCOSRequest(`SELECT 1 FROM ${CATEGORIES_TABLE} LIMIT 1`);
    categoriesTableConnected = true;
  } catch (err) {
    log.error(`Error requesting from categories table: ${err}`);
  }
  return {
    agenciesTableConnected,
    categoriesTableConnected,
  };
}

export { getHealth };

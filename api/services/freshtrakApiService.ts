import request from 'request-promise';
import getLogger from '../utils/logger';
import { FRESHTRAK_API_HOST } from '../utils/constants';

const log = getLogger('freshtrakApiService');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getFreshTrakEvents(agencyId: any): Promise<any>{
  console.log('in getFreshTrakEvents');
  const opts = {
    headers: {
      'User-Agent': 'mofb-api',
    },
  };
  const url = `${FRESHTRAK_API_HOST}/api/agencies/${agencyId}`;

  log.debug(`Making GET request to ${url}`);

  try {
    const response = await request.get(url);
    return JSON.parse(response);
  } catch (err) {
    log.debug(`Error from FreshTrak API: ${err}`);
  }
}

export { getFreshTrakEvents };

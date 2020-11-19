import request from 'request-promise';
import getLogger from '../utils/logger';
import { FRESHTRAK_API_HOST } from '../utils/constants';
import freshtrakResponseDto from '../models/freshtrakAPI/freshtrakResponseDto';

const log = getLogger('freshtrakApiService');

  async function getFreshTrakEvents(agencyId: number): Promise<freshtrakResponseDto | null> {
  const opts = {
    headers: {
      'Content-Type': 'application/json',
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
    return null;
  }
}

export { getFreshTrakEvents };

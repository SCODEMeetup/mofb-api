import request from 'request-promise';
import getLogger from '../utils/logger';
import { SCOS_HOST } from '../utils/constants';

const log = getLogger('scosService');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function makeSCOSRequest(body: any): Promise<any> {
  const opts = {
    body,
    headers: {
      'Content-Type': 'text/plain',
      'User-Agent': 'mofb-api',
    },
  };
  const url = `${SCOS_HOST}/api/v1/query?_format=json`;

  log.debug(`Making POST request to ${url}`);

  try {
    const response = await request.post(url, opts);
    return JSON.parse(response);
  } catch (err) {
    throw new Error(`Error from SCOS API: ${err}`);
  }
}

export { makeSCOSRequest };

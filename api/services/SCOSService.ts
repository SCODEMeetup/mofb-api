import request from 'request-promise';
import getLogger from '../utils/logger';

const { SCOS_HOST } = process.env;

const log = getLogger('scosService');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function makeSCOSRequest(body: any): Promise<any> {
  const opts = {
    method: 'POST',
    body,
    url: `${SCOS_HOST}/api/v1/query?_format=json`,
    headers: {
      'Content-Type': 'text/plain',
    },
  };
  log.debug(`Making POST request to ${opts.url}`);
  try {
    const response = await request(opts);
    return JSON.parse(response);
  } catch (err) {
    throw new Error(`Error from SCOS API: ${JSON.stringify(err.error)}`);
  }
}

export { makeSCOSRequest };

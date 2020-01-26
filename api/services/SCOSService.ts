import bunyan from 'bunyan';
import request from 'request-promise';

const { SCOS_HOST } = process.env;

const log = bunyan.createLogger({ name: 'SCOSService' });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function makeSCOSRequest(body: any): Promise<any> {
  const opts = {
    method: 'POST',
    body,
    url: `${SCOS_HOST}/api/v1/query?_format=json`,
    json: true,
  };
  log.debug(`Making POST request to ${opts.url}`);
  try {
    const response = await request(opts);
    return response;
  } catch (err) {
    throw new Error(`Error from SCOS API: ${JSON.stringify(err.error)}`);
  }
}

export { makeSCOSRequest };

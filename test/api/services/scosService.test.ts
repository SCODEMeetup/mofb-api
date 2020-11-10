import request from 'request-promise';
import { makeSCOSRequest } from '../../../api/services/scosService';
import { SCOS_HOST } from '../../../api/utils/constants';

jest.mock('request-promise', () => {
  return {
    post: (uri: string, options: any): Promise<any> => {
      return Promise.resolve(JSON.stringify(options));
    },
  };
});

describe('scosService', () => {
  describe('.makeSCOSRequest', () => {
    it('posts to the scos and returns a response object', async () => {
      const post = jest.spyOn(request, 'post');

      const sqlQuery = 'SELECT * from my_fancy_table';
      const url = `${SCOS_HOST}/api/v1/query?_format=json`;

      const response = await makeSCOSRequest(sqlQuery);

      expect(post).toHaveBeenCalledWith(url, {
        body: sqlQuery,
        headers: {
          'Content-Type': 'text/plain',
          'User-Agent': 'mofb-api',
        },
      });
      expect(response.body).toEqual(sqlQuery);
      expect(response.headers['Content-Type']).toEqual('text/plain');

      post.mockRestore();
    });
  });
});

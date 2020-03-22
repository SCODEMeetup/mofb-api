import { NextFunction, Request, Response, Router } from 'express';
import {
  NotFoundError,
  HttpError,
} from 'typescript-rest/dist/server/model/errors';
import createLogger from '../utils/logger';
import { ENV } from '../utils/constants';

const log = createLogger('errorHandler');

const handle404Error = (router: Router): void => {
  router.use((req: Request, res: Response): void => {
    if (!res.headersSent) {
      throw new NotFoundError('Method not found.');
    }
  });
};

const handleClientError = (router: Router): void => {
  router.use(
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      if (err instanceof HttpError) {
        if (ENV !== 'test') {
          log.warn(err);
        }
        res.status(err.statusCode).send({
          title: err.name,
          message: err.message,
          status: err.statusCode,
        });
      } else {
        next(err);
      }
    }
  );
};

const handleServerError = (router: Router): void => {
  router.use(
    async (err: Error, req: Request, res: Response): Promise<void> => {
      if (ENV !== 'test') {
        log.error(err);
      }

      const data = {
        title: err.name,
        message: 'Internal Server Error',
        status: 500,
      };

      res.status(500).send(data);
    }
  );
};

export { handle404Error, handleClientError, handleServerError };

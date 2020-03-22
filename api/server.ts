import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'typescript-rest';

const { ENV } = process.env;
const path = `.env${ENV ? `.${ENV}` : ''}`;
dotenv.config({ path });

// NOTE: these imports happen here because they require dotenv to be configured first
/* eslint-disable import/first */
import { PORT, LOG_LEVEL, IS_TESTING } from './utils/constants';
import createLogger, { initLogger } from './utils/logger';

// NOTE: this initLogger function needs to be called before importing any file that uses the logger
initLogger(LOG_LEVEL);
const log = createLogger('mofb-api');

import controllers from './controllers';
import {
  handle404Error,
  handleClientError,
  handleServerError,
} from './middleware/errorHandlers';
/* eslint-enable import/first */

const handleException = (e: Error | {} | null | undefined): void => {
  log.error(e);
  process.exit(1);
};

process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleException);

const app = express();

if (!IS_TESTING) {
  Server.swagger(app, { filePath: './dist/swagger.json' });
}

// pre-routing middleware
app.use(cors());

Server.buildServices(app, ...controllers);
Server.ignoreNextMiddlewares(true);

handle404Error(app);
handleClientError(app);
handleServerError(app);

if (!IS_TESTING) {
  app.listen(
    PORT,
    async (): Promise<void> => {
      log.info(`Server is running on port ${PORT}...`);
    }
  );
}

export default app;

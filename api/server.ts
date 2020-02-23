import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'typescript-rest';
import createLogger, { initLogger } from './utils/logger';
import { ENV, PORT, LOG_LEVEL } from './utils/constants';

import controllers from './controllers';
import {
  handle404Error,
  handleClientError,
  handleServerError,
} from './middleware/errorHandlers';

const path = `.env${ENV ? `.${ENV}` : ''}`;
dotenv.config({ path });

initLogger(LOG_LEVEL);
const log = createLogger('mofb-api');

const handleException = (e: Error): void => {
  log.error(e);
  process.exit(1);
};

const handleRejection = (reason: {} | null | undefined): void => {
  log.error(reason);
  process.exit(1);
};

process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleRejection);

const app = express();

if (ENV !== 'test') {
  Server.swagger(app, { filePath: './dist/swagger.json' });
}

// pre-routing middleware
app.use(cors());

Server.buildServices(app, ...controllers);
Server.ignoreNextMiddlewares(true);

handle404Error(app);
handleClientError(app);
handleServerError(app);

app.listen(
  PORT,
  async (): Promise<void> => {
    log.info(`Server is running on port ${PORT}...`);
  }
);

export default app;

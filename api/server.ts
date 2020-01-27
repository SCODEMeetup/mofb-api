import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'typescript-rest';
import createLogger, { initLogger } from './utils/logger';

const { ENV } = process.env;
const path = `.env${ENV ? `.${ENV}` : ''}`;
dotenv.config({ path });

const { PORT = 8000, LOG_LEVEL = 'info' } = process.env;

initLogger(LOG_LEVEL);
const log = createLogger('mofb-api');

// NOTE: these imports happen here because they require the env to be configured first
/* eslint-disable import/first */
import controllers from './controllers';
import {
  handle404Error,
  handleClientError,
  handleServerError,
} from './middleware/errorHandlers';
/* eslint-enable import/first */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (e: any): void => {
  log.error(e);
  process.exit(1);
};

process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);

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

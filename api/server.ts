import bunyan from 'bunyan';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'typescript-rest';
import {
  handle404Error,
  handleClientError,
  handleServerError,
} from './middleware/errorHandlers';

dotenv.config();

const { ENV, PORT = 8000 } = process.env;

const log = bunyan.createLogger({ name: 'mofb-api' });

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

// NOTE: this require has to happen here so the env is already set up
// eslint-disable-next-line global-require
Server.buildServices(app, ...require('./controllers').default);
// only execute one endpoint
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

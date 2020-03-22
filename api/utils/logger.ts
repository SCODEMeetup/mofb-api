import bunyan from 'bunyan';
import { IS_TESTING } from './constants';

let logLevel: bunyan.LogLevel;

const createLogger = (name: string): bunyan =>
  bunyan.createLogger({
    name,
    level: IS_TESTING ? bunyan.FATAL + 1 : logLevel,
  });

export function initLogger(level: string): void {
  logLevel = level as bunyan.LogLevel;
}

export default function getLogger(name: string): bunyan {
  return createLogger(name);
}

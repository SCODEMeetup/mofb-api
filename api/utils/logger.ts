import bunyan from 'bunyan';

let logLevel: bunyan.LogLevel;

const createLogger = (name: string): bunyan =>
  bunyan.createLogger({
    name,
    level: logLevel,
  });

export function initLogger(level: string): void {
  logLevel = level as bunyan.LogLevel;
}

export default function getLogger(name: string): bunyan {
  return createLogger(name);
}

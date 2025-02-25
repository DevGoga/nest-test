import pino from 'pino';
import { baseStrategy } from './base.strategy';

export const developmentStrategy: pino.LoggerOptions = {
  ...baseStrategy,
  formatters: {
    ...baseStrategy.formatters,
    bindings: () => ({}),
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      timestampKey: 'timestamp',
      messageKey: 'message',
    },
  },
};

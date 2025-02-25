import { LoggerOptions } from 'pino';
import { APP_NAME, APP_VERSION } from '../../app.constants';
import { baseStrategy } from './base.strategy';

export const productionStrategy: LoggerOptions = {
  ...baseStrategy,
  formatters: {
    ...baseStrategy.formatters,
    bindings: () => ({
      appName: APP_NAME,
      appVersion: APP_VERSION,
    }),
  },
};

import { Logger } from '../helpers/logging/Logger';

export class LoggerFactory {
    static loggerConfig;

    static setLoggerConfig(config) {
        this.loggerConfig = config;
        return this;
    }

    static createLogger() {
        return new Logger(this.loggerConfig);
    }
}

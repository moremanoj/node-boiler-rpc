
import { LogLevel } from './LogLevel';
import * as util from 'util';

export class Logger {
    loggers = [];

    constructor(options) {
        this.options = {
            ...options,
            serviceName: "rabbitmq-test",
            serviceVersion: "1.0",
            serviceEnvironment: "test"
        }
    }

    debug(entry) {
        const logObj = {
            level: LogLevel.Debug.name,
            severity: LogLevel.Debug.severity,
            message: entry.message,
            contextStringified: util.inspect(entry.context, { depth: null })
        };

        this.log(logObj);
    }

    info(entry) {
        const logObj = {
            level: LogLevel.Info.name,
            severity: LogLevel.Info.severity,
            message: entry.message,
            contextStringified: util.inspect(entry.context, { depth: null })
        };

        this.log(logObj);
    }

    warn(entry) {
        const logObj = {
            level: LogLevel.Warn.name,
            severity: LogLevel.Warn.severity,
            message: entry.message,
            contextStringified: util.inspect(entry.context, { depth: null })
        };

        this.log(logObj);
    }

    error(entry){
        const logObj= {
            level: LogLevel.Error.name,
            severity: LogLevel.Error.severity,
            message: entry.message,
            contextStringified: util.inspect(entry.context, { depth: null })
        };

        if (entry.error) {
            logObj.error = {
                errorMessage: entry.error.message,
                stack: entry.error.stack,
                stringified: JSON.stringify(entry.error)
            };
        }

        this.log(logObj);
    }

    log(logObj) {
        this.loggers.forEach(logger => {
            logger.log({
                ...logObj,
                serviceName: this.options.serviceName,
                serviceVersion: this.options.serviceVersion,
                serviceEnvironment: this.options.environment
            });
        });
    }
}

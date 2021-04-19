// @filename: log.ts

import * as log4js from "log4js";

log4js.configure({
	appenders: {
		out: {
			type: 'stdout',
			layout: {
				type: 'pattern',
				pattern: '[%d][%h][pid:%z][%f{0}:%l][%p][%X{X-RequestId}][%m]'
			}
		}
	},
	categories: {
		default: {
			appenders: ['out'],
			level: 'trace',
			enableCallStack: true
		}
	}
});

const logger = log4js.getLogger();

// TODO: get log level from config
logger.level = "trace";

export interface ILogger {
	Trace(msg: any, ...args: any[]): void;
	Debug(msg: any, ...args: any[]): void;
	Info(msg: any, ...args: any[]): void;
	Warn(msg: any, ...args: any[]): void;
	Error(msg: any, ...args: any[]): void;
	Fatal(msg: any, ...args: any[]): void;
}

class implLogger implements ILogger {
	Trace(msg: any, ...args: any[]) {
		logger.trace(msg, ...args);
	}

	Debug(msg: any, ...args: any[]) {
		logger.debug(msg, ...args);
	}

	Info(msg?: any, ...args: any[]) {
		logger.info(msg, ...args);
	}

	Warn(msg: any, ...args: any[]) {
		logger.warn(msg, ...args);
	}

	Error(msg: any, ...args: any[]) {
		logger.error(msg, ...args);
	}

	Fatal(msg: any, ...args: any[]) {
		logger.fatal(msg, ...args);
	}
}

const instanceLogger = new implLogger()

export function RequestId(id: string): ILogger {
	logger.addContext("X-RequestId", id)
	return instanceLogger
}

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
	Trace(msg: string): void;
	Debug(msg: string): void;
	Info(msg: string): void;
	Warn(msg: string): void;
	Error(msg: string): void;
	Fatal(msg: string): void;
}

class implLogger implements ILogger {
	Trace(msg: string) {
		logger.trace("%s", msg);
	}

	Debug(msg: string) {
		logger.debug("%s", msg);
	}

	Info(msg: string) {
		logger.info("%s", msg)
	}

	Warn(msg: string) {
		logger.warn("%s", msg)
	}

	Error(msg: string) {
		logger.error("%s", msg)
	}

	Fatal(msg: string) {
		logger.fatal("%s", msg)
	}
}

const instanceLogger = new implLogger()

export function RequestId(id: string): ILogger {
	logger.addContext("X-RequestId", id)
	return instanceLogger
}

// @filename: log.ts
import * as log4js from 'log4js';

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

// Default log level
logger.level = "trace";

export function SetLogLevel(lv: string) {
	logger.level = lv
}

export function RequestId(id?: string): log4js.Logger {
	if (id === undefined) {
		id = '0';
	}
	logger.addContext("X-RequestId", id);
	return logger;
}

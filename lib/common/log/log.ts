// @filename: log.ts
// Example:
//   import * as log from "./log";
//   log.RequestId("reqId1").Trace("This is a trace msg");

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

	Fatal(msg: any, ...args: any[]) {
		logger.fatal(msg, ...args);
	}
}

const instanceLogger = new implLogger();

export function RequestId(id?: string): ILogger {
	if (id === undefined) {
		id = '0';
	}
	logger.addContext("X-RequestId", id);
	return instanceLogger;
}

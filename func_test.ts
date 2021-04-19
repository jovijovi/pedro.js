// @filename: test_log.ts

import { getLogger } from "log4js";
const logger = getLogger();
logger.level = "trace";

export function foo(msg: string) {
	logger.log("# %s", msg)
	logger.trace("I am foo");
	logger.debug("I am foo");
	logger.info("I am foo")
	logger.warn("I am foo")
	logger.error("I am foo")
	logger.fatal("I am foo")
}

function bar(msg: string) {
	logger.log("%s", msg)
}

function funcA(msg: string): string {
	return msg
}

function funcB(msg: string) {
	let a = funcA(msg)
	let rsp = a + "!"
	logger.log("%s", rsp)
}

foo("I am in log.ts");
bar("haha")
funcB("Hello")
logger.trace("%s", "123123")

import { server } from './network/http/server'
import { config } from "./common/config";
import * as core from "express-serve-static-core";
import * as log from "./common/log";
import { ITaskHandler } from "./taskhandler";

function biz1(req, res) {
	res.send('biz1');
	log.RequestId().Info("biz1");
}

async function biz2(req, res) {
	res.send('biz2');
	log.RequestId().Info("biz2");
}

function registerBizAPI(router: core.Express) {
	router.get('/api/v1/biz1', biz1);
	router.get('/api/v1/biz2', biz2);
}

function registerAnotherBizAPI(router: core.Express) {
	// Nothing to do here
}

class privateImplHandlers implements ITaskHandler {
	RegisterHandlers(router: core.Express) {
		registerBizAPI(router);
		registerAnotherBizAPI(router);
	}
}

const AppHandlers = new privateImplHandlers();

function main() {
	config.LoadConfig('./conf/app.config.yaml');
	server.Run(AppHandlers);
}

main();

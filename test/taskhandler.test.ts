import {server} from '../network/http/server'
import {config} from "../common/config";
import * as core from "express-serve-static-core";
import * as log from "../common/log";
import {ITaskHandler} from "../taskhandler";

function biz1(req, rsp) {
	log.RequestId().Info("Req=", req)
	rsp.send('biz1')
}

async function biz2(req, rsp) {
	log.RequestId().Info("Req=", req)
	rsp.send('biz2')
}

function registerBizAPI(router: core.Express) {
	router.get('/api/v1/biz1', biz1)
	router.get('/api/v1/biz2', biz2)
}

class privateImplHandlers implements ITaskHandler {
	RegisterHandlers(router: core.Express) {
		registerBizAPI(router)
	}
}

const AppHandlers = new privateImplHandlers();

test('HttpServer', () => {
	config.LoadConfig('./conf/app.config.yaml');
	server.Run(AppHandlers);
})

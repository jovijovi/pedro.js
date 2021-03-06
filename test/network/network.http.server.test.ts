import {config, log} from '@jovijovi/pedrojs-common';
import * as core from 'express-serve-static-core';
import {http} from '../../lib/network'
import {ITaskHandler} from '../../lib/network/http';
import {KEY} from '../../lib/network/http/middleware/requestid';

function biz1(req, res) {
	log.RequestId(req[KEY]).info("Req=", req);
	res.send('biz1');
}

async function biz2(req, res) {
	log.RequestId(req[KEY]).info("Req=", req);
	res.send('biz2');
}

function registerBizAPI(router: core.Express) {
	router.get('/api/v1/biz1', biz1);
	router.get('/api/v1/biz2', biz2);
}

class privateImplHandlers implements ITaskHandler {
	RegisterHandlers(router: core.Express) {
		registerBizAPI(router);
	}

	UseMiddleware(app: core.Express) {
		// Custom middleware
		return;
	}
}

const AppHandlers = new privateImplHandlers();

test('TaskHandler', () => {
	config.LoadConfig('./conf/app.config.yaml');
	http.server.Run(AppHandlers);
})

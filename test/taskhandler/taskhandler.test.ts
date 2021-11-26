import {server} from '../../lib/network/http/server'
import {config} from '../../lib/common/config';
import * as core from 'express-serve-static-core';
import * as log from '../../lib/common/log';
import {ITaskHandler} from '../../lib/taskhandler';

function biz1(req, res) {
	log.RequestId().info("Req=", req);
	res.send('biz1');
}

async function biz2(req, res) {
	log.RequestId().info("Req=", req);
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
}

const AppHandlers = new privateImplHandlers();

test('TaskHandler', () => {
	config.LoadConfig('./conf/app.config.yaml');
	server.Run(AppHandlers);
})

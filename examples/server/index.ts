import * as core from 'express-serve-static-core';
import {server} from '../../lib/network/http/server';
import {heartbeat} from '../../lib/network/websocket/server';
import {config} from '../../lib/common/config';
import * as log from '../../lib/common/log';
import {ITaskHandler} from '../../lib/taskhandler';
import * as sys from '../../lib/common/sys';
import {logo} from './logo';
import {Tracing} from '../../lib/tracing';

function biz1(req, res) {
	res.send('biz1');
	log.RequestId().info("biz1");
}

async function biz2(req, res) {
	res.send('biz2');
	log.RequestId().info("biz2");
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
	log.logo(logo);
	sys.HandleSignals();
	config.LoadConfig();
	heartbeat.Run();

	Tracing.Init({
		serviceName: "pedro-service",
		tracerName: "foo",
		tracerVersion: "1.0.0",
		endpoint: "http://localhost:14268/api/traces",
	});

	server.Run(AppHandlers);
}

main();

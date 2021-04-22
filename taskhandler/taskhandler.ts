import * as express from 'express';
import * as core from 'express-serve-static-core';
import * as log from '../common/log';
import * as healthcheck from './healthcheck'
import * as metricscheck from './metricscheck'

interface ITaskHandler {
	// RegisterHealthCheck(router: core.Express): void;
}

class implTaskHandler implements ITaskHandler {
	// RegisterHealthCheck(router: core.Express) {
	// 	router.get('/health', healthcheck.Health)
	// 	router.get('/ping', healthcheck.Ping)
	// }
}

const instanceTaskHandler= new implTaskHandler();

function RegisterHealthCheck(router: core.Express) {
	router.get('/health', healthcheck.Health)
	router.get('/ping', healthcheck.Ping)
}

function RegisterMetricsCheck(router: core.Express) {
	router.get('/metrics', metricscheck.Metrics)
}

export function RegisterHandlers(router: core.Express) {
	// instanceTaskHandler.RegisterHealthCheck(router)
	RegisterHealthCheck(router)
	RegisterMetricsCheck(router)
}

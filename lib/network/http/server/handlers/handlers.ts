import * as core from 'express-serve-static-core';
import * as bodyParser from 'body-parser';
import {Tracing} from '@jovijovi/pedrojs-tracing';
import {RequestID} from '../../middleware/requestid';
import * as healthcheck from './health';
import * as metricscheck from './metrics';
import {ITaskHandler} from '../interfaces';

class implTaskHandler implements ITaskHandler {
	RegisterHandlers(router: core.Express) {
		this.RegisterHealthCheck(router);
		this.RegisterMetricsCheck(router);
	}

	RegisterHealthCheck(router: core.Express) {
		router.get('/health', healthcheck.Health);
		router.get('/ping', healthcheck.Ping);
	}

	RegisterMetricsCheck(router: core.Express) {
		router.get('/metrics', metricscheck.Metrics);
	}

	UseMiddleware(app: core.Express) {
		this.UseDefaultMiddleware(app);
	}

	UseDefaultMiddleware(app: core.Express) {
		app.use(bodyParser.urlencoded({extended: false}));
		app.use(bodyParser.json());
		app.use(Tracing.Add);
		app.use(RequestID);
	}
}

const baseHandlers = new implTaskHandler();

export function RegisterHandlers(router: core.Express, privateHandlers: ITaskHandler) {
	baseHandlers.RegisterHandlers(router);
	if (privateHandlers != undefined) {
		privateHandlers.RegisterHandlers(router);
	}
}

export function UseMiddleware(app: core.Express, privateHandlers: ITaskHandler) {
	baseHandlers.UseMiddleware(app);
	if (privateHandlers != undefined) {
		privateHandlers.UseMiddleware(app);
	}
}

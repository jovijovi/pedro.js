import express from 'express';
import {config, log} from '@jovijovi/pedrojs-common';
import {RegisterHandlers, UseMiddleware} from './handlers';
import {ITaskHandler} from './interfaces';

const app = express();

export namespace server {
	function RunWithoutTLS(port: number, handlers: ITaskHandler) {
		UseMiddleware(app, handlers);
		RegisterHandlers(app, handlers);
		const s = app.listen(port, () => {
			log.RequestId().info('The HTTP(%s) server is running...', s.address());
		});
	}

	// TODO: RunWithTLS
	function RunWithTLS(port: number, handlers: ITaskHandler) {
		handlers ? console.log(port) : console.log(0);
	}

	export function Run(handlers?: ITaskHandler) {
		const networkConf = config.GetYmlConfig().network;
		if (networkConf.httpServer.enable) {
			RunWithoutTLS(networkConf.httpServer.port, handlers);
		} else if (networkConf.httpsServer.enable) {
			RunWithTLS(networkConf.httpsServer.port, handlers);
		}
	}
}

import express from 'express';
import * as bodyParser from 'body-parser';
import * as log from '@jovijovi/pedrojs-common/log';
import {config} from '@jovijovi/pedrojs-common/config';
import {RegisterHandlers} from './handlers';
import {ITaskHandler} from './interfaces';
import {Tracing} from '@jovijovi/pedrojs-tracing';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(Tracing.Add);

export namespace server {
	function RunWithoutTLS(port: number, handlers: ITaskHandler) {
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

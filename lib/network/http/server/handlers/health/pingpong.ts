import * as log from '@jovijovi/pedrojs-common/log';
import {Tracing} from '@jovijovi/pedrojs-tracing';

export function Ping(req, res) {
	res.send('pong');
	log.RequestId().info("pong");
	Tracing.End(req);
}

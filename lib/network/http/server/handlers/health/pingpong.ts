import {log} from '@jovijovi/pedrojs-common';
import {Tracing} from '@jovijovi/pedrojs-tracing';

export function Ping(req, res) {
	res.send('pong');
	log.RequestId().info("pong");
	Tracing.End(req);
}

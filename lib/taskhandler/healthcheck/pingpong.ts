import * as log from '../../common/log';
import {Tracing} from '../../tracing';

export function Ping(req, res) {
	res.send('pong');
	log.RequestId().info("pong");
	Tracing.End(req);
}

import * as log from '@jovijovi/pedrojs-common/log';
import * as response from '../../response';
import {Version} from '@jovijovi/pedrojs-common/version';
import {Tracing} from '@jovijovi/pedrojs-tracing';

export function Health(req, res) {
	res.send(response.BuildResponse("200", "SuccessfulOperation", Version.GetVersionInfo()));
	log.RequestId(req.traceId).trace("Receive HealthCheck. URL.Path=", req.url);
	Tracing.End(req);
}

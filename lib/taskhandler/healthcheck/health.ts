import * as log from '../../common/log';
import * as response from '../../network/http/response';
import {Version} from '../../common/version';
import {Tracing} from '../../tracing';

export function Health(req, res) {
	res.send(response.BuildResponse("200", "SuccessfulOperation", Version.GetVersionInfo()));
	log.RequestId(req.traceId).trace("Receive HealthCheck. URL.Path=", req.url);
	Tracing.End(req);
}

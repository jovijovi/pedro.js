import * as log from '@jovijovi/pedrojs-common/log';
import {Metrics as mi} from '@jovijovi/pedrojs-common/metrics';
import * as response from '../../response';
import {Tracing} from '@jovijovi/pedrojs-tracing';

export function Metrics(req, res) {
	res.send(response.BuildResponse("200", "SuccessfulOperation", JSON.parse(mi.GetMetricsInfo().toJSON())));
	log.RequestId().info("Receive MetricsCheck. URL.Path=", req.url);
	Tracing.End(req);
}

import {log, metrics} from '@jovijovi/pedrojs-common';
import * as response from '../../response';
import {Tracing} from '@jovijovi/pedrojs-tracing';

export function Metrics(req, res) {
	res.send(response.BuildResponse("200", "SuccessfulOperation", JSON.parse(metrics.GetMetricsInfo().toJSON())));
	log.RequestId().info("Receive MetricsCheck. URL.Path=", req.url);
	Tracing.End(req);
}

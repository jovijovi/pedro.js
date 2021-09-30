import * as log from '../../common/log';
import {Metrics as mi} from "../../common/metrics";
import * as response from "../../network/http/response";

export function Metrics(req, res) {
	res.send(response.BuildResponse("200", "SuccessfulOperation", JSON.parse(mi.GetMetricsInfo().toJSON())));
	log.RequestId().info("Receive MetricsCheck. URL.Path=", req.url);
}

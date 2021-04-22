import * as log from "../../common/log";

export function Metrics(req, rsp) {
	rsp.send('Metrics');
	log.RequestId().Info("Metrics")
}
import * as log from "../../common/log";

export function Metrics(req, res) {
	res.send('Metrics');
	log.RequestId().Info("Metrics")
}
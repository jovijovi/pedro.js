import * as log from "../../common/log";

export function Health(req, res) {
	res.send('OK');
	log.RequestId().Info("Health")
}
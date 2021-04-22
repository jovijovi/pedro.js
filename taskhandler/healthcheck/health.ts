import * as log from "../../common/log";

export function Health(req, rsp) {
	rsp.send('OK');
	log.RequestId().Info("Health")
}
import * as log from "../../common/log";

export function Ping(req, rsp) {
	rsp.send('pong');
	log.RequestId().Info("pong")
}
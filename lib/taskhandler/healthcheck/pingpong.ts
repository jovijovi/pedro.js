import * as log from "../../common/log";

export function Ping(req, res) {
	res.send('pong');
	log.RequestId().info("pong")
}
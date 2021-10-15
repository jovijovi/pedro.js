import {Data, WebSocketServer} from 'ws';
import * as log from '../../../common/log';
import {config} from '../../../common/config';
import {server as wsServer} from './server';

export namespace heartbeat {
	const ping = 'ping';
	const pong = 'pong';

	// Heartbeat instance
	function Heartbeat(opts: wsServer.WebsocketOptions) {
		if (!opts) {
			throw new Error("Heartbeat options is empty");
		} else if (!opts.port) {
			throw new Error("Heartbeat port is empty");
		}

		const wss = new WebSocketServer({port: opts.port});

		wss.on('connection', function connection(ws, req) {
			ws.on('ping', () => {
				if (opts.logger) {
					log.RequestId().trace("pong to (%s)", req.socket.remoteAddress);
				}
			});

			// Manual Ping-Pong by message
			ws.on('message', (message: Data) => {
				if (message && message == ping) {
					ws.send(pong);
					if (opts.logger) {
						log.RequestId().trace("message pong to (%s)", req.socket.remoteAddress);
					}
				}
			});

			ws.on('close', (code, reason) => {
				if (opts.logger) {
					log.RequestId().trace("Heartbeat disconnected: code=%d, reason=%s", code, reason);
				}
			});
		});

		log.RequestId().info("Heartbeat (%s) is running...", wss.address());
	}

	// Run heartbeat
	export function Run() {
		if (config.GetYmlConfig().heartbeat.enable) {
			wsServer.Run(Heartbeat, {
				port: config.GetYmlConfig().heartbeat.port,
				logger: config.GetYmlConfig().heartbeat.logger,
			});
		}
	}
}

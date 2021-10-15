import {ServerOptions} from 'ws';
import * as log from '../../../common/log';

export namespace server {
	type wsServerInstance = (options: WebsocketOptions) => void;

	export interface WebsocketOptions extends ServerOptions {
		wss?: boolean;
		logger?: boolean;
		cert?: Buffer;
		key?: Buffer;
	}

	// Run websocket server
	export function Run(wsServer: wsServerInstance, opts?: WebsocketOptions) {
		try {
			if (wsServer) {
				wsServer(opts);
			}
		} catch (e) {
			log.RequestId().error(e);
		}
	}
}



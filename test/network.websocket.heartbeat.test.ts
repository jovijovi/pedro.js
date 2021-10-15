import {config} from '../lib/common/config';
import {heartbeat} from '../lib/network/websocket/server';

test('WebSocketServer', () => {
	config.LoadConfig('./conf/app.config.yaml');
	heartbeat.Run();
})

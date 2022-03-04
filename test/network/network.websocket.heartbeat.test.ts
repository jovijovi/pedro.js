import {config} from '@jovijovi/pedrojs-common';
import {websocket} from '../../lib/network';

test('WebSocketServer', () => {
	config.LoadConfig('./conf/app.config.yaml');
	websocket.heartbeat.Run();
})

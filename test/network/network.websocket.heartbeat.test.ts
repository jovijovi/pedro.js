import {config} from '@jovijovi/pedrojs-common/config';
import {websocket} from '../../lib/network';

test('WebSocketServer', () => {
	config.LoadConfig('./conf/app.config.yaml');
	websocket.heartbeat.Run();
})

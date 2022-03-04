import {config} from '@jovijovi/pedrojs-common';
import {http} from '../../lib/network';

test('HttpServer', () => {
	config.LoadConfig('./conf/app.config.yaml');
	http.server.Run();
})

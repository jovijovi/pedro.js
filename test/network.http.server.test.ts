import { server } from '../lib/network/http/server'
import { config } from "../lib/common/config";

test('HttpServer', () => {
	config.LoadConfig('./conf/app.config.yaml');
	// server.Run();
})

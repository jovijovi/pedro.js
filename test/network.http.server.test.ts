import { server } from '../network/http/server'
import { config } from "../common/config";

test('HttpServer', () => {
	config.LoadConfig('./conf/app.config.yaml');
	// server.Run();
})

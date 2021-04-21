import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as log from '@common/log';
import { config } from '@common/config';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

export namespace server {

	app.get('/health', function (req, res) {
		log.RequestId().Info('Req=', req.body);
		res.send('OK');
	})

	function RunWithoutTLS(port: number) {
		const s = app.listen(port);
		log.RequestId().Info('The HTTP(%s) server is running...', s.address());
	}

	export function Run() {
		if (config.GetYmlConfig().network.httpServer.enable) {
			RunWithoutTLS(config.GetYmlConfig().network.httpServer.port);
		}
	}
}
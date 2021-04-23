import { config } from '../lib/common/config';
import * as log from '../lib/common/log';

test('LoadConfig', () => {
	config.LoadConfig('./conf/app.config.yaml');
})

test('GetYmlConfig', () => {
	log.RequestId().Info("YmlConfig=", config.GetYmlConfig());
})
import { config } from '@common/config';
import * as log from '@common/log';

test('LoadConfig', () => {
	config.LoadConfig('./conf/example.yaml');
})

test('GetYmlConfig', () => {
	log.RequestId().Info("YmlConfig=", config.GetYmlConfig());
})
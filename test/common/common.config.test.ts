import {config, log} from '../../lib/common';

test('LoadConfig', () => {
	config.LoadConfig('./conf/app.config.yaml');
})

test('GetYmlConfig', () => {
	log.RequestId().info("YmlConfig=", config.GetYmlConfig());
})

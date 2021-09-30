import {Metrics} from '../lib/common/metrics';

test('Metrics', () => {
	const mi = Metrics.GetMetricsInfo();
	console.log("MetricsInfo=", mi);
	console.log("MetricsInfoJSON=", mi.toJSON());
})

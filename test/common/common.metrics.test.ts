import {metrics} from '../../lib/common';

test('Metrics', () => {
	const mi = metrics.GetMetricsInfo();
	console.log("MetricsInfo=", mi);
	console.log("MetricsInfoJSON=", mi.toJSON());
})

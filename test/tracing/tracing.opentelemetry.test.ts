import * as opentelemetry from '@opentelemetry/api';
import {Tracing} from '../../lib/tracing';

beforeAll(() => {
	Tracing.Init({
		serviceName: "pedro-service",
		tracerName: "foo",
		tracerVersion: "1.0.0",
		endpoint: "http://localhost:14268/api/traces",
	});
})

test('Tracing', () => {
	// Create a span
	const span = Tracing.Tracer().startSpan("Hello");

	try {
		// If we get here and nothing has thrown, the request completed successfully
		span.setStatus({code: opentelemetry.SpanStatusCode.OK});
	} catch (err) {
		// When we catch an error, we want to show that an error occurred
		span.setStatus({
			code: opentelemetry.SpanStatusCode.ERROR,
			message: err.message,
		});
	} finally {
		// Every span must be ended or it will not be exported
		span.end();
	}

	console.log("TraceId=", span.spanContext().traceId);
})

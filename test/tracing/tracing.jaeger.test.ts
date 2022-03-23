import * as jaeger from 'jaeger-client';
import {opentracing} from 'jaeger-client';
import * as http from 'http';
import {log} from '../../lib/common';

test('Tracing', () => {
	const config = {
		serviceName: 'app',
		reporter: {
			collectorEndpoint: 'http://localhost:14268',
			// Provide username and password if authentication is enabled in the Collector
			// username: '',
			// password: '',
		},
	};

	const options = {
		tags: {
			'app.version': '1.0.0',
		},
		// metrics: metrics,
		logger: log.Logger(),
	};

	const tracer = jaeger.initTracer(config, options);
	const span = tracer.startSpan('http_request');

	const opts = {
		host: 'example.com',
		method: 'GET',
		port: '80',
		path: '/',
	};

	http.request(opts, res => {
		res.setEncoding('utf8');
		res.on('error', err => {
			// assuming no retries, mark the span as failed
			span.setTag(opentracing.Tags.ERROR, true);
			span.log({'event': 'error', 'error.object': err, 'message': err.message, 'stack': err.stack});
			span.finish();
		});
		res.on('data', chunk => {
			span.log({'event': 'data_received', 'chunk_length': chunk.length});
		});
		res.on('end', () => {
			span.log({'event': 'request_end'});
			span.finish();
		});
	}).end();
})

import * as opentelemetry from '@opentelemetry/api';
import {Resource} from '@opentelemetry/resources';
import {SemanticResourceAttributes} from '@opentelemetry/semantic-conventions';
import {SimpleSpanProcessor} from '@opentelemetry/sdk-trace-base';
import {JaegerExporter} from '@opentelemetry/exporter-jaeger';
import {NodeTracerProvider} from '@opentelemetry/sdk-trace-node';
import {ExporterConfig} from '@opentelemetry/exporter-jaeger/build/src/types';
import {registerInstrumentations} from '@opentelemetry/instrumentation';

const {ExpressInstrumentation} = require('@opentelemetry/instrumentation-express');
const {HttpInstrumentation} = require('@opentelemetry/instrumentation-http');

export namespace Tracing {
	export interface Config extends ExporterConfig {
		serviceName: string;
		tracerName: string;
		tracerVersion: string;
		endpoint: string;
	}

	let _tracer: opentelemetry.Tracer;

	export function Init(cfg: Config) {
		// Create and register an SDK
		const provider = new NodeTracerProvider({
			resource: new Resource({
				[SemanticResourceAttributes.SERVICE_NAME]: cfg.serviceName,
			}),
		});

		// JaegerExporter by default
		const exporter = new JaegerExporter({
			endpoint: cfg.endpoint,
		});

		provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

		/**
		 * Initialize the OpenTelemetry APIs to use the BasicTracerProvider bindings.
		 *
		 * This registers the tracer provider with the OpenTelemetry API as the global
		 * tracer provider. This means when you call API methods like
		 * `opentelemetry.trace.getTracer`, they will use this tracer provider. If you
		 * do not register a global tracer provider, instrumentation which calls these
		 * methods will receive no-op implementations.
		 */
		provider.register();

		registerInstrumentations({
			tracerProvider: provider,
			instrumentations: [
				new HttpInstrumentation(),
				new ExpressInstrumentation(),
			]
		});

		// Get a global tracer
		_tracer = opentelemetry.trace.getTracer(cfg.tracerName, cfg.tracerVersion);
	}

	export function Tracer(): opentelemetry.Tracer {
		return _tracer;
	}

	export function Add(req, res, next) {
		const span = opentelemetry.trace.getSpan(opentelemetry.context.active());
		if (span) {
			req.traceId = span.spanContext().traceId;
		} else if (Tracing.Tracer()) {
			req.span = Tracing.Tracer().startSpan(req.originalUrl);
			req.traceId = req.span.spanContext().traceId;
		}

		next();
	}

	export function End(req) {
		if (!req.span) {
			return;
		}
		req.span.end();
	}
}

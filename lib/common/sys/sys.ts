import * as log from '../log';
import * as time from '../util/time';

export const SIGINT = 'SIGINT';
export const SIGTERM = 'SIGTERM';
export const SIGHUP = 'SIGHUP';

const Signals = [
	SIGINT,
	SIGTERM,
	SIGHUP,
];

function shutdown() {
	log.Close(() => {
			console.log("[%s] ### Logger close done.", time.GetLocalTimeStamp());
			process.abort();
		}
	);
}

function handle(signal) {
	log.RequestId().info("PID=%d, Signal=%s, system exit.", process.pid, signal);
	shutdown();
}

export function HandleSignals() {
	Signals.forEach(sig => {
		process.on(sig, handle);
	})
}
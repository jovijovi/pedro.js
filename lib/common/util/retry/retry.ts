import * as time from '../time';
import * as log from '../../log';

// Retry times by default
const DefaultRetryTimes = 3;

// Retry interval by default (in seconds)
const DefaultRetryInterval = 3;

export interface Func<T> {
	(arg: T): T;
}

export async function Run<T>(f: Func<T>, retryTimes = DefaultRetryTimes, retryInterval = DefaultRetryInterval): Promise<T> {
	let rsp = undefined;

	for (let i = 1; i <= retryTimes; i++) {
		try {
			rsp = await f(<T>{});
			break;
		} catch (e) {
			log.Logger().error('Try times=%d, error=%o', i, e);
			if (i == retryTimes) {
				rsp = e;
				break;
			}
			await time.SleepSeconds(retryInterval);
		}
	}

	return rsp;
}

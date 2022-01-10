import * as time from '../time';
import * as log from '../../log';

// Retry times by default
const DefaultRetryTimes = 3;

// Retry interval by default (in seconds)
const DefaultRetryInterval = 3;

export interface Func<T> {
	(arg: T): Error;
}

export async function Run<T>(f: Func<T>, retryTimes = DefaultRetryTimes): Promise<any> {
	let rsp = undefined;

	for (let i = 0; i < retryTimes; i++) {
		try {
			rsp = f(<T>{});
			break;
		} catch (e) {
			log.Logger().error('Try times=%d, error=%o', i + 1, e);
			if (i == retryTimes - 1) {
				rsp = e;
				break;
			}
			await time.SleepSeconds(DefaultRetryInterval);
		}
	}

	return rsp;
}

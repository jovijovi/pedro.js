import * as time from '../time';
import * as log from '../../log';

// Retry times by default
const DefaultRetryTimes = 3;

// Retry interval by default (in seconds)
const DefaultRetryInterval = 3;

export interface Func<T> {
	(arg: T): T;
}

// Retry running the function m times with n seconds interval
export async function Run<T>(f: Func<T>, retryTimes = DefaultRetryTimes, retryInterval = DefaultRetryInterval): Promise<T> {
	for (let i = 1; i <= retryTimes; i++) {
		try {
			return await f(<T>{});
		} catch (e) {
			log.Logger().error('Try times=%d, error=%o', i, e);
			if (i == retryTimes) {
				throw e;
			}
			await time.SleepSeconds(retryInterval);
		}
	}
}

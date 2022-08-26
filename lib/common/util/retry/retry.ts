import * as time from '../time';
import {log} from '../../log';
import * as random from '../random';

// Retry times by default
const DefaultRetryTimes = 3;

// Retry interval by default (in seconds)
const DefaultRetryInterval = 3;

// Retry min interval (in seconds)
const DefaultRetryMinInterval = DefaultRetryInterval;

// Retry max interval (in seconds)
const DefaultRetryMaxInterval = DefaultRetryMinInterval * 3;

export interface IFunc<T> {
	(arg: T): T;
}

// Retry running the function m times with n seconds interval
export async function Run<T>(f: IFunc<T>, retryTimes = DefaultRetryTimes, retryInterval = DefaultRetryInterval, verboseLog = true): Promise<T> {
	for (let i = 1; i <= retryTimes; i++) {
		try {
			return await f(<T>{});
		} catch (e) {
			if (verboseLog) {
				log.Logger().error('Try times=%d, error=%o', i, e);
			}
			if (i == retryTimes) {
				throw e;
			}
			await time.SleepSeconds(retryInterval);
		}
	}
}

// RandomRetryInterval range: [min, max)
export function RandomRetryInterval(min = DefaultRetryMinInterval, max = DefaultRetryMaxInterval) {
	return random.RandUIntBetween(min, max);
}

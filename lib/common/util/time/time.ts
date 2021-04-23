import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'

dayjs.extend(utc);

// Format: ISO8601_WITH_TZ_OFFSET
// Docs: https://day.js.org/docs/en/display/format
export const ISO8601_WITH_TZ_OFFSET = 'YYYY-MM-DDTHH:mm:ss.SSSZZ';

// Format: ISO8601
export const ISO8601 = 'YYYY-MM-DDTHH:mm:ss.SSS';

// Format: RFC3339
export const RFC3339_LIKE = 'YYYY-MM-DDTHH:mm:ss[Z]Z';

// GetLocalTimeStamp
export function GetLocalTimeStamp(): string {
	return dayjs(Date.now()).format(ISO8601_WITH_TZ_OFFSET);
}

// GetUTCTimeStamp
export function GetUTCTimeStamp(): string {
	return dayjs(Date.now()).utc().format(ISO8601_WITH_TZ_OFFSET);
}


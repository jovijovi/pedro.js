import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// Format: ISO8601_WITH_TZ_OFFSET
// Docs: https://day.js.org/docs/en/display/format
export const ISO8601_WITH_TZ_OFFSET = 'YYYY-MM-DDTHH:mm:ss.SSSZZ';

// Format: ISO8601 (UNIX)
// Example: 2021-09-03T08:11:10-04:00
export const ISO8601_UNIX_WITH_TZ_OFFSET = 'YYYY-MM-DDTHH:mm:ssZ';

// Format: ISO8601
export const ISO8601 = 'YYYY-MM-DDTHH:mm:ss.SSS';

// Format: RFC3339
export const RFC3339_LIKE = 'YYYY-MM-DDTHH:mm:ss[Z]Z';

// Format: Date Like
export const DATE_LIKE = 'YYYY-MM-DD';

// GetLocalTimeStamp
export function GetLocalTimeStamp(): string {
	return dayjs(Date.now()).format(ISO8601_WITH_TZ_OFFSET);
}

// GetUTCTimeStamp
export function GetUTCTimeStamp(format: string = ISO8601_WITH_TZ_OFFSET): string {
	return dayjs(Date.now()).utc().format(format);
}

// GetDateByZone returns date by time zone
// Example: 'Asia/Shanghai'
export function GetDateByZone(timezone?: string): string {
	return dayjs(Date.now()).tz(timezone).format(DATE_LIKE);
}

// GetUnixTimestamp returns unix timestamp string in ISO8601_UNIX_WITH_TZ_OFFSET
export function GetUnixTimestamp(timestamp: number, timezone?: string): string {
	return dayjs.unix(timestamp).tz(timezone).format(ISO8601_UNIX_WITH_TZ_OFFSET);
}

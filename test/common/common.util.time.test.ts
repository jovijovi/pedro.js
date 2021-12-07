import * as log from '../../lib/common/log';
import {
	DATE_LIKE,
	GetDateByZone,
	GetLocalTimeStamp,
	GetUnixTime,
	GetUnixTimestamp,
	GetUTCTimeStamp,
	ISO8601,
	ISO8601_UNIX_WITH_TZ_OFFSET,
	RFC3339_LIKE
} from '../../lib/common/util/time';

test('GetLocalTimeStamp', () => {
	for (let i = 0; i < 5; i++) {
		log.RequestId().info("LocalTimeStamp=", GetLocalTimeStamp());
	}
})

test('GetUTCTimeStamp', () => {
	log.RequestId().info("UTCTimeStamp(ISO8601_WITH_TZ_OFFSET)=", GetUTCTimeStamp());
	log.RequestId().info("UTCTimeStamp(ISO8601_UNIX_WITH_TZ_OFFSET)=", GetUTCTimeStamp(ISO8601_UNIX_WITH_TZ_OFFSET));
	log.RequestId().info("UTCTimeStamp(ISO8601)=", GetUTCTimeStamp(ISO8601));
	log.RequestId().info("UTCTimeStamp(RFC3339_LIKE)=", GetUTCTimeStamp(RFC3339_LIKE));
	log.RequestId().info("UTCTimeStamp(DATE_LIKE)=", GetUTCTimeStamp(DATE_LIKE));
})

test('GetDateByZone', () => {
	// Get time zones list from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

	log.RequestId().info("DateByZone(System)=", GetDateByZone());

	log.RequestId().info("DateByZone(America/Los_Angeles)=", GetDateByZone('America/Los_Angeles'));
	log.RequestId().info("DateByZone(America/Toronto)=", GetDateByZone('America/Toronto'));
	log.RequestId().info("DateByZone(America/New_York)=", GetDateByZone('America/New_York'));
	log.RequestId().info("DateByZone(Europe/London)=", GetDateByZone('Europe/London'));
	log.RequestId().info("DateByZone(Africa/Cairo)=", GetDateByZone('Africa/Cairo'));
	log.RequestId().info("DateByZone(Europe/Moscow)=", GetDateByZone('Europe/Moscow'));
	log.RequestId().info("DateByZone(Asia/Qatar)=", GetDateByZone('Asia/Qatar'));
	log.RequestId().info("DateByZone(Asia/Dubai)=", GetDateByZone('Asia/Dubai'));
	log.RequestId().info("DateByZone(Asia/Shanghai)=", GetDateByZone('Asia/Shanghai'));
	log.RequestId().info("DateByZone(Asia/Singapore)=", GetDateByZone('Asia/Singapore'));
	log.RequestId().info("DateByZone(Asia/Tokyo)=", GetDateByZone('Asia/Tokyo'));
	log.RequestId().info("DateByZone(Australia/Sydney)=", GetDateByZone('Australia/Sydney'));
})

test('GetUnixTimestamp', () => {
	// Get time zones list from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

	log.RequestId().info("GetUnixTimestamp(System)=", GetUnixTimestamp(GetUnixTime()));

	log.RequestId().info("GetUnixTimestamp(America/Los_Angeles)=", GetUnixTimestamp(GetUnixTime(), 'America/Los_Angeles'));
	log.RequestId().info("GetUnixTimestamp(America/Toronto)=", GetUnixTimestamp(GetUnixTime(), 'America/Toronto'));
	log.RequestId().info("GetUnixTimestamp(America/New_York)=", GetUnixTimestamp(GetUnixTime(), 'America/New_York'));
	log.RequestId().info("GetUnixTimestamp(Europe/London)=", GetUnixTimestamp(GetUnixTime(), 'Europe/London'));
	log.RequestId().info("GetUnixTimestamp(Africa/Cairo)=", GetUnixTimestamp(GetUnixTime(), 'Africa/Cairo'));
	log.RequestId().info("GetUnixTimestamp(Europe/Moscow)=", GetUnixTimestamp(GetUnixTime(), 'Europe/Moscow'));
	log.RequestId().info("GetUnixTimestamp(Asia/Qatar)=", GetUnixTimestamp(GetUnixTime(), 'Asia/Qatar'));
	log.RequestId().info("GetUnixTimestamp(Asia/Dubai)=", GetUnixTimestamp(GetUnixTime(), 'Asia/Dubai'));
	log.RequestId().info("GetUnixTimestamp(Asia/Shanghai)=", GetUnixTimestamp(GetUnixTime(), 'Asia/Shanghai'));
	log.RequestId().info("GetUnixTimestamp(Asia/Singapore)=", GetUnixTimestamp(GetUnixTime(), 'Asia/Singapore'));
	log.RequestId().info("GetUnixTimestamp(Asia/Tokyo)=", GetUnixTimestamp(GetUnixTime(), 'Asia/Tokyo'));
	log.RequestId().info("GetUnixTimestamp(Australia/Sydney)=", GetUnixTimestamp(GetUnixTime(), 'Australia/Sydney'));
})

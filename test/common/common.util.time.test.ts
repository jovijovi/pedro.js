import {log, util} from '../../lib/common';
import {DATE_LIKE, ISO8601, ISO8601_UNIX_WITH_TZ_OFFSET, RFC3339_LIKE,} from '../../lib/common/util/time';

test('GetLocalTimeStamp', () => {
	for (let i = 0; i < 5; i++) {
		log.RequestId().info("LocalTimeStamp=", util.time.GetLocalTimeStamp());
	}
})

test('GetUTCTimeStamp', () => {
	log.RequestId().info("UTCTimeStamp(ISO8601_WITH_TZ_OFFSET)=", util.time.GetUTCTimeStamp());
	log.RequestId().info("UTCTimeStamp(ISO8601_UNIX_WITH_TZ_OFFSET)=", util.time.GetUTCTimeStamp(ISO8601_UNIX_WITH_TZ_OFFSET));
	log.RequestId().info("UTCTimeStamp(ISO8601)=", util.time.GetUTCTimeStamp(ISO8601));
	log.RequestId().info("UTCTimeStamp(RFC3339_LIKE)=", util.time.GetUTCTimeStamp(RFC3339_LIKE));
	log.RequestId().info("UTCTimeStamp(DATE_LIKE)=", util.time.GetUTCTimeStamp(DATE_LIKE));
})

test('GetDateByZone', () => {
	// Get time zones list from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

	log.RequestId().info("DateByZone(System)=", util.time.GetDateByZone());

	log.RequestId().info("DateByZone(America/Los_Angeles)=", util.time.GetDateByZone('America/Los_Angeles'));
	log.RequestId().info("DateByZone(America/Toronto)=", util.time.GetDateByZone('America/Toronto'));
	log.RequestId().info("DateByZone(America/New_York)=", util.time.GetDateByZone('America/New_York'));
	log.RequestId().info("DateByZone(Europe/London)=", util.time.GetDateByZone('Europe/London'));
	log.RequestId().info("DateByZone(Africa/Cairo)=", util.time.GetDateByZone('Africa/Cairo'));
	log.RequestId().info("DateByZone(Europe/Moscow)=", util.time.GetDateByZone('Europe/Moscow'));
	log.RequestId().info("DateByZone(Asia/Qatar)=", util.time.GetDateByZone('Asia/Qatar'));
	log.RequestId().info("DateByZone(Asia/Dubai)=", util.time.GetDateByZone('Asia/Dubai'));
	log.RequestId().info("DateByZone(Asia/Shanghai)=", util.time.GetDateByZone('Asia/Shanghai'));
	log.RequestId().info("DateByZone(Asia/Singapore)=", util.time.GetDateByZone('Asia/Singapore'));
	log.RequestId().info("DateByZone(Asia/Tokyo)=", util.time.GetDateByZone('Asia/Tokyo'));
	log.RequestId().info("DateByZone(Australia/Sydney)=", util.time.GetDateByZone('Australia/Sydney'));
})

test('GetUnixTimestamp', () => {
	// Get time zones list from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

	log.RequestId().info("GetUnixTimestamp(System)=", util.time.GetUnixTimestamp(util.time.GetUnixTime()));

	log.RequestId().info("GetUnixTimestamp(America/Los_Angeles)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'America/Los_Angeles'));
	log.RequestId().info("GetUnixTimestamp(America/Toronto)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'America/Toronto'));
	log.RequestId().info("GetUnixTimestamp(America/New_York)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'America/New_York'));
	log.RequestId().info("GetUnixTimestamp(Europe/London)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'Europe/London'));
	log.RequestId().info("GetUnixTimestamp(Africa/Cairo)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'Africa/Cairo'));
	log.RequestId().info("GetUnixTimestamp(Europe/Moscow)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'Europe/Moscow'));
	log.RequestId().info("GetUnixTimestamp(Asia/Qatar)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'Asia/Qatar'));
	log.RequestId().info("GetUnixTimestamp(Asia/Dubai)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'Asia/Dubai'));
	log.RequestId().info("GetUnixTimestamp(Asia/Shanghai)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'Asia/Shanghai'));
	log.RequestId().info("GetUnixTimestamp(Asia/Singapore)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'Asia/Singapore'));
	log.RequestId().info("GetUnixTimestamp(Asia/Tokyo)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'Asia/Tokyo'));
	log.RequestId().info("GetUnixTimestamp(Australia/Sydney)=", util.time.GetUnixTimestamp(util.time.GetUnixTime(), 'Australia/Sydney'));
})

test('Sleep', () => {
	util.time.Sleep(500);
	util.time.SleepSeconds(1);
})

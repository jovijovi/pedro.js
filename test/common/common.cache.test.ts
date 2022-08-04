import {cache, util} from '../../lib/common';
import assert from 'assert';

test('CacheSet', async () => {
	// New cache set
	const set = cache.New();

	// New cache1
	const cache1a = set.New("Cache1");
	const rsp = cache1a.set('key1', 'value1');
	console.log("Response=", rsp);
	console.log("Cache1a.Key=%o", cache1a.get('key1'));
	assert.strictEqual(cache1a.get('key1'), 'value1');

	// Get another cache1
	const cache1b = set.Get("Cache1");
	console.log("Cache1b.Key=%o", cache1b.get('key1'));
	assert.strictEqual(cache1b.get('key1'), 'value1');

	// New cache2
	const cache2 = set.New("Cache2", {
		max: 4,
		ttl: 1000 * 4,
		updateAgeOnGet: true,
	});
	cache2.set('key2', 'value2');
	cache2.set('key3', 'value3');
	cache2.set('key4', 'value4');
	console.log("Cache2.Key2=%o", cache2.get('key2'));  // Update age(ttl) by 'get'
	await util.time.SleepSeconds(2);
	console.log("Cache2.Key2=%o", cache2.get('key2'));  // Update age(ttl) by 'get'
	await util.time.SleepSeconds(2);
	console.log("Cache2.Key2=%o", cache2.get('key2'));  // Update age(ttl) by 'get'
	await util.time.SleepSeconds(2);
	console.log("Cache2.Key2=%o", cache2.get('key2'));
	console.log("Cache2.Key3=%o", cache2.get('key3'));
	console.log("Cache2.Key4=%o", cache2.get('key4'));
	console.log("Cache2.Key2=%o", cache2.get('key2'));
	assert.strictEqual(cache2.get('key2'), 'value2');

	// Clear cache set
	set.Clear();
	console.log("Cache1a.Key=%o", cache1a.get('key1'));
	assert.strictEqual(cache1a.get('key1'), undefined);

	// Remove all cache object (NOT SAFE)
	set.Remove();
	const a = set.Get("Cache1");
	assert.strictEqual(a, null);
	const b = set.Get("Cache2");
	assert.strictEqual(b, null);
}, 100000)

test('Get empty set', () => {
	// New cache set
	const set = cache.New();

	// New cache1
	try {
		set.New("Cache1", {});
	} catch (e) {
		console.debug("Expected error=", e);
	}

	const empty = set.Get(null);
	assert.strictEqual(empty, null);
})

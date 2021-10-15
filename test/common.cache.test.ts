import {NSCacheSet} from '../lib/common/cache';
import assert from "assert";

test('CacheSet', () => {
	// New cache set
	const set = NSCacheSet.New();

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
		max: 2,
		maxAge: 1000 * 30,
	});
	cache2.set('key2', 'value2');
	console.log("Cache2.Key=%o", cache2.get('key2'));
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
})


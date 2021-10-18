import {Leveldb} from '../lib/modules/leveldb';
import * as assert from 'assert';

test('Connection', async () => {
	// Connect
	const engine = await Leveldb.Connect({
		dbname: './test/database/world',
	});

	// Test put
	await engine.put('date', '2021/01/01');
	const value1 = await engine.get('date');
	console.log("Value1=", value1);
	assert.strictEqual(value1, '2021/01/01');

	await engine.put('date', '2022/01/01');
	const value2 = await engine.get('date');
	console.log("Value2=", value2);
	assert.strictEqual(value2, '2022/01/01');

	assert.notStrictEqual(value2, value1);
})

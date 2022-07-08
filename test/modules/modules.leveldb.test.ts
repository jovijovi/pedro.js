import {Leveldb} from '../../lib/modules/leveldb';
import * as assert from 'assert';
import fs from 'fs';

const _mockDb = './test/modules/database/leveldb/world';

test('Connection', async () => {
	// Make database directory
	fs.mkdirSync(_mockDb, {recursive: true});

	// Connect
	const engine = await Leveldb.Connect({
		dbname: _mockDb,
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

test('Error: Connection failed', async () => {
	try {
		// Connect
		await Leveldb.Connect({
			dbname: '',
		});
	} catch (e) {
		console.debug("Expect Error=", e);
	}
})

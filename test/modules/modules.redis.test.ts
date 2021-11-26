import {Redis} from '../../lib/modules/redis';
import assert from 'assert';

test('Connection', async () => {
	// Connect
	const engine = await Redis.Connect({
		// Connection string format:
		// redis[s]://[[username][:password]@][host][:port][/db-number]
		url: 'redis://localhost:6379/1',
	});

	// Test Ping
	await engine.Ping();

	// Test SET
	await engine.client.set('key1', 'value1');

	// Test GET
	const value = await engine.client.get('key1');
	console.log("Value1=", value);
	assert.strictEqual(value, 'value1');

	// Test Close
	await engine.Close();
})

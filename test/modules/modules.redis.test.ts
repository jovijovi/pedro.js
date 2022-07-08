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

	try {
		// It will be failed if try to force close since the client is already closed
		await engine.ForceClose();
	} catch (e) {
		console.debug("Expect Error=", e);
	}
})

test('ForceClose', async () => {
	const engine = await Redis.Connect({
		url: 'redis://localhost:6379/1',
	});

	await engine.Ping();

	// Test Force close
	await engine.ForceClose();

	// Ping again
	// It will be failed if ping again since the client is already closed
	try {
		await engine.Ping();
	} catch (e) {
		console.debug("Expected Error=", e);
	}
})

test('Error: Connection failed', async () => {
	try {
		// Connect with invalid url
		await Redis.Connect({
			url: '',
		});
	} catch (e) {
		console.debug("Expected Error=", e);
	}
})

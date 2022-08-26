import {util} from '../../lib/common';
import {IFunc} from '../../lib/common/util/retry';
import assert from 'assert';

// Function example
function transistor(input: number): IFunc<string> {
	return <T>(): string => {
		const voltage = 1;
		const delta = input - voltage;
		if (delta > 0) {
			throw new Error('too high');
		} else if (delta < 0) {
			throw new Error('too low');
		}

		return "42";
	};
}

// Test Retry
// JEST: 30s timeout by default
test('Retry', async () => {
	try {
		const rsp1 = await util.retry.Run(transistor(0));
		console.log("Rsp1=", rsp1);
	} catch (e) {
		assert.notEqual(e, undefined);
		console.log(e);
	}

	try {
		const rsp2 = await util.retry.Run(transistor(2));
		console.log("Rsp2=", rsp2);
	} catch (e) {
		assert.notEqual(e, undefined);
		console.log(e);
	}

	try {
		const rsp3 = await util.retry.Run(transistor(1));
		assert.strictEqual(rsp3, "42");
		console.log("Rsp3=%o", rsp3);
	} catch (e) {
		console.error(e);
	}
}, 30000)

test('Retry Async', async () => {
	try {
		// Retry running the func, retry 2 time, interval 1s
		const rsp1 = await util.retry.Run(async <T>(): Promise<number> => {
			throw new Error('Mock error 1');
		}, 3, util.retry.RandomRetryInterval(1, 3), false);
		console.log("Rsp1=", rsp1);
	} catch (e) {
		assert.notEqual(e, undefined);
		console.log(e.message);
	}

	try {
		const rsp2 = await util.retry.Run(async <T>(): Promise<number> => {
			return 42;
		}, 3, util.retry.RandomRetryInterval());
		assert.strictEqual(rsp2, 42);
		console.log("Rsp2=%o", rsp2);
	} catch (e) {
		console.error(e);
	}

}, 15000)

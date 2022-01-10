import * as retry from '../../lib/common/util/retry'
import {Func} from '../../lib/common/util/retry'
import assert from "assert";

// Function example
function transistor(input: number): Func<any> {
	return <T>(): Error => {
		const voltage = 1;
		const delta = input - voltage;
		if (delta > 0) {
			throw new Error('too high');
		} else if (delta < 0) {
			throw new Error('too low');
		}

		return;
	};
}

// Test Retry
// JEST: 30s timeout by default
test('Retry', async () => {
	const rsp1 = await retry.Run(transistor(0))
	assert.notEqual(rsp1, undefined);
	console.log("Rsp1=", rsp1);

	const rsp2 = await retry.Run(transistor(2))
	assert.notEqual(rsp2, undefined);
	console.log("Rsp2=", rsp2);

	const rsp3 = await retry.Run(transistor(1));
	assert.strictEqual(rsp3, undefined);
	console.log("Rsp3=", rsp3);
}, 30000)

import {util} from '../../lib/common';
import assert from 'assert';

test('NewUUID', () => {
	console.log(util.uuid.NewUUID());
})

test('NewUUID32bits', () => {
	const newUuid = util.uuid.NewUUID32bits();
	console.log(newUuid);
	assert.strictEqual(newUuid.length, 32);
})

test('CustomUUID', () => {
	console.log(util.uuid.CustomUUID(0));
	console.log(util.uuid.CustomUUID(6));
})

test('CustomUUIDWithRandCase', () => {
	for (let i = 0; i < 10; i++) {
		console.log(util.uuid.CustomUUIDWithRandCase(8));
	}
})

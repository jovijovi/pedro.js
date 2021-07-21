import * as uuid from '../lib/common/util/uuid/uuid';
import assert from "assert";

test('NewUUID', ()=> {
	console.log(uuid.NewUUID());
})

test('NewUUID32bits', ()=> {
	const newUuid = uuid.NewUUID32bits();
	console.log(newUuid);
	assert.strictEqual(newUuid.length, 32);
})

test('CustomUUID', ()=> {
	console.log(uuid.CustomUUID(0));
	console.log(uuid.CustomUUID(6));
})

test('CustomUUIDWithRandCase', ()=> {
	for (let i = 0; i < 10; i++) {
		console.log(uuid.CustomUUIDWithRandCase(8));
	}
})

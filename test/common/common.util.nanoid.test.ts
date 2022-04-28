import {util} from '../../lib/common';
import assert from 'assert';

test('NewNanoID', () => {
	const id = util.nanoid.NewNanoID();
	console.log("NewNanoID=", id);
	assert.strictEqual(id.length, 32);
})

test('CustomNanoID', () => {
	const regExp = new RegExp('^[a-c1-3]+$')

	const id1 = util.nanoid.NewNanoID({alphabet: 'abc123'});
	console.log("id1=", id1);
	assert.strictEqual(id1.length, 32);
	assert.match(id1, regExp)

	const id2 = util.nanoid.NewNanoID({alphabet: 'abc123', size: 6});
	console.log("id2=", id2);
	assert.strictEqual(id2.length, 6);
	assert.match(id1, regExp)

	const id3 = util.nanoid.NewNanoID({size: 21});
	console.log("id3=", id3);
	assert.strictEqual(id3.length, 21);
	assert.doesNotMatch(id3, regExp)
})

test('BatchNewNanoID', () => {
	const nanoIDs = util.nanoid.BatchNewNanoID(10);
	console.log("NanoIDs=", nanoIDs);
	assert.strictEqual(nanoIDs.length, 10);
})

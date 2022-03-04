import * as assert from 'assert';
import {security} from '../../lib/common';

const message = '1234567890';
const mockHashString = 'c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646';

test('Get', () => {
	const hashBuffer = security.crypto.digest.Get(message, 'sha256');
	console.log("HashBuffer=", hashBuffer);
})

test('GetString', () => {
	const hashString = security.crypto.digest.GetString(message, 'sha256');
	console.log("HashString=", hashString);
	assert.strictEqual(hashString, mockHashString);
})

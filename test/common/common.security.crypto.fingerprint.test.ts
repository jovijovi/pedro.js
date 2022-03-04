import * as assert from 'assert';
import {security} from '../../lib/common';

const message = '1234567890';
const mockHashString = '01b307acba4f54f55aafc33bb06bbbf6ca803e9a';

test('Get', () => {
	const fp = security.crypto.fingerprint.Get(message, 'sha1');
	console.log("Fingerprint=", fp);
	assert.strictEqual(fp, mockHashString);
})

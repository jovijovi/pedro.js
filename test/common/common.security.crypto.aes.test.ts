import * as assert from 'assert';
import {security} from '../../lib/common';

test('Encrypt/Decrypt', () => {
	const mockUserKey = "this is a user key 1234567890";
	const mockPlainText = "Hello, world! 1234567890 ~!@#$%^&*()_+";

	const cipherText = security.crypto.aes.Encrypt(mockUserKey, mockPlainText);
	console.log("cipherText=", cipherText);

	const plainText = security.crypto.aes.Decrypt(mockUserKey, cipherText);
	console.log("plainText=", plainText);

	assert.strictEqual(plainText, mockPlainText);
})

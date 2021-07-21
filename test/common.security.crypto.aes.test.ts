import * as assert from 'assert';
import * as aes from '../lib/common/security/crypto/aes';

test('Encrypt/Decrypt', () => {
	const mockUserKey = "this is a user key 1234567890";
	const mockPlainText = "Hello, world! 1234567890 ~!@#$%^&*()_+";

	const cipherText = aes.Encrypt(mockUserKey, mockPlainText);
	console.log("cipherText=", cipherText);

	const plainText = aes.Decrypt(mockUserKey, cipherText);
	console.log("plainText=", plainText);

	assert.strictEqual(plainText, mockPlainText);
})

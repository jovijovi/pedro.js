import {BinaryLike, createCipheriv, createDecipheriv, randomFillSync, scryptSync} from 'crypto';

const defaultAlgorithm = 'aes-256-gcm';

// Key length and algorithm
// 16   AES-128
// 24   AES-192
// 32   AES-256
const defaultKeyLength = 32;
const defaultSaltLength = 64;
const defaultIVLength = 16;
const defaultAuthTagLength = 16;

// getSalt returns random uint8 array
function getSalt(): Uint8Array {
	return randomFillSync(new Uint8Array(defaultSaltLength));
}

// getIV returns random uint array
function getIV(): Uint8Array {
	return randomFillSync(new Uint8Array(defaultIVLength));
}

// Encrypt plain text by user key
// CipherResult=Base64([Salt]+[IV]+[AuthTag]+[CipherText])
export function Encrypt(userKey: BinaryLike, plainText: string): any {
	const salt = getSalt();
	const key = scryptSync(userKey, salt, defaultKeyLength);
	const iv = getIV();

	const cipher = createCipheriv(defaultAlgorithm, key, iv);
	const cipherText = Buffer.concat([
		cipher.update(plainText, 'utf8'),
		cipher.final(),
	]);

	const authTag = cipher.getAuthTag();

	return Buffer.concat([salt, iv, authTag, cipherText]).toString('base64');
}

// Decrypt cipher text by user key
export function Decrypt(userKey: BinaryLike, cipherText: string): string {
	if (!cipherText || cipherText.length < defaultSaltLength + defaultIVLength + defaultAuthTagLength) {
		throw new Error("invalid cipher text");
	}

	const array = Uint8Array.from(Buffer.from(cipherText, 'base64'));

	const salt = array.slice(0, defaultSaltLength);
	const iv = array.slice(defaultSaltLength, defaultSaltLength + defaultIVLength);
	const authTag = array.slice(defaultSaltLength + defaultIVLength, defaultSaltLength + defaultIVLength + defaultAuthTagLength);
	const cipherData = array.slice(defaultSaltLength + defaultIVLength + defaultAuthTagLength);

	const key = scryptSync(userKey, salt, defaultKeyLength);
	const decipher = createDecipheriv(defaultAlgorithm, key, iv);
	decipher.setAuthTag(authTag);

	let plainText = decipher.update(cipherData, null, 'utf8');
	plainText += decipher.final('utf8');

	return plainText;
}

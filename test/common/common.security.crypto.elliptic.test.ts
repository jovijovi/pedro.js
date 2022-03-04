import * as assert from 'assert';
import {security} from '../../lib/common';

const data = 'Hello, world!';

test('ECDSA Sign/Verify', () => {
	const key = security.crypto.elliptic.ECDSA.NewKeyPair();
	const priKeyPEM = key.privateKey.export({
		format: security.crypto.elliptic.ECDSA.DefaultEncodeFormat,
		type: security.crypto.elliptic.ECDSA.DefaultPriKeyEncodeType
	}).toString();
	console.log("## [ECDSA] priKeyPEM=", priKeyPEM);

	const sig = security.crypto.elliptic.ECDSA.Sign(data, priKeyPEM, security.crypto.elliptic.SHA256);
	console.log("## [ECDSA] sig=", sig.toString('hex'));

	const pubKeyPEM = key.publicKey.export({
		format: security.crypto.elliptic.ECDSA.DefaultEncodeFormat,
		type: security.crypto.elliptic.ECDSA.DefaultPubKeyEncodeType
	}).toString();
	console.log("## [ECDSA] pubKeyPEM=", pubKeyPEM);

	const result = security.crypto.elliptic.ECDSA.Verify(data, pubKeyPEM, sig, security.crypto.elliptic.SHA256);
	console.log("## [ECDSA] result=", result);

	assert.strictEqual(result, true);
})

test('ED25519 Sign/Verify', () => {
	const key = security.crypto.elliptic.ED25519.NewKeyPair();
	const priKeyPEM = key.privateKey.export({
		format: security.crypto.elliptic.ED25519.DefaultEncodeFormat,
		type: security.crypto.elliptic.ED25519.DefaultPriKeyEncodeType
	}).toString();
	console.log("## [ED25519] priKeyPEM=", priKeyPEM);

	const sig = security.crypto.elliptic.ED25519.Sign(data, priKeyPEM);
	console.log("## [ED25519] sig=", sig.toString('hex'));

	const pubKeyPEM = key.publicKey.export({
		format: security.crypto.elliptic.ED25519.DefaultEncodeFormat,
		type: security.crypto.elliptic.ED25519.DefaultPubKeyEncodeType
	}).toString();
	console.log("## [ED25519] pubKeyPEM=", pubKeyPEM);

	const result = security.crypto.elliptic.ED25519.Verify(data, pubKeyPEM, sig);
	console.log("## [ED25519] result=", result);

	assert.strictEqual(result, true);
})

test('ECDSA Export encrypt private key', () => {
	const key = security.crypto.elliptic.ECDSA.NewKeyPair();
	const plainPriKeyPEM1 = key.privateKey.export({
		format: security.crypto.elliptic.ECDSA.DefaultEncodeFormat,
		type: security.crypto.elliptic.ECDSA.DefaultPriKeyEncodeType,
	}).toString();
	console.log("## [ECDSA] plainPriKeyPEM=", plainPriKeyPEM1);

	const encryptedPriKeyPEM = key.privateKey.export({
		format: security.crypto.elliptic.ECDSA.DefaultEncodeFormat,
		type: security.crypto.elliptic.ECDSA.DefaultPriKeyEncodeType,
		cipher: 'aes-256-cbc',
		passphrase: '1234567890',
	}).toString();
	console.log("## [ECDSA] encryptedPriKeyPEM=", encryptedPriKeyPEM);

	const privateKey = security.crypto.elliptic.EllipticBase.LoadPrivateKey(encryptedPriKeyPEM, '1234567890')

	const plainPriKeyPEM2 = privateKey.export({
		format: security.crypto.elliptic.ECDSA.DefaultEncodeFormat,
		type: security.crypto.elliptic.ECDSA.DefaultPriKeyEncodeType,
	}).toString();

	assert.strictEqual(plainPriKeyPEM1, plainPriKeyPEM2);
})

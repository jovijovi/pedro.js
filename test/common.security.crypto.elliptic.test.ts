import * as assert from 'assert';
import * as elliptic from '../lib/common/security/crypto/elliptic';

const data = 'Hello, world!';

test('ECDSA Sign/Verify', () => {
	const key = elliptic.ECDSA.NewKeyPair();
	const priKeyPEM = key.privateKey.export({
		format: elliptic.ECDSA.DefaultEncodeFormat,
		type: elliptic.ECDSA.DefaultPriKeyEncodeType
	}).toString();
	console.log("## [ECDSA] priKeyPEM=", priKeyPEM);

	const sig = elliptic.ECDSA.Sign(data, priKeyPEM, elliptic.SHA256);
	console.log("## [ECDSA] sig=", sig.toString('hex'));

	const pubKeyPEM = key.publicKey.export({
		format: elliptic.ECDSA.DefaultEncodeFormat,
		type: elliptic.ECDSA.DefaultPubKeyEncodeType
	}).toString();
	console.log("## [ECDSA] pubKeyPEM=", pubKeyPEM);

	const result = elliptic.ECDSA.Verify(data, pubKeyPEM, sig, elliptic.SHA256);
	console.log("## [ECDSA] result=", result);

	assert.strictEqual(result, true);
})

test('ED25519 Sign/Verify', () => {
	const key = elliptic.ED25519.NewKeyPair();
	const priKeyPEM = key.privateKey.export({
		format: elliptic.ED25519.DefaultEncodeFormat,
		type: elliptic.ED25519.DefaultPriKeyEncodeType
	}).toString();
	console.log("## [ED25519] priKeyPEM=", priKeyPEM);

	const sig = elliptic.ED25519.Sign(data, priKeyPEM);
	console.log("## [ED25519] sig=", sig.toString('hex'));

	const pubKeyPEM = key.publicKey.export({
		format: elliptic.ED25519.DefaultEncodeFormat,
		type: elliptic.ED25519.DefaultPubKeyEncodeType
	}).toString();
	console.log("## [ED25519] pubKeyPEM=", pubKeyPEM);

	const result = elliptic.ED25519.Verify(data, pubKeyPEM, sig);
	console.log("## [ED25519] result=", result);

	assert.strictEqual(result, true);
})

test('ECDSA Export encrypt private key', () => {
	const key = elliptic.ECDSA.NewKeyPair();
	const plainPriKeyPEM1 = key.privateKey.export({
		format: elliptic.ECDSA.DefaultEncodeFormat,
		type: elliptic.ECDSA.DefaultPriKeyEncodeType,
	}).toString();
	console.log("## [ECDSA] plainPriKeyPEM=", plainPriKeyPEM1);

	const encryptedPriKeyPEM = key.privateKey.export({
		format: elliptic.ECDSA.DefaultEncodeFormat,
		type: elliptic.ECDSA.DefaultPriKeyEncodeType,
		cipher: 'aes-256-cbc',
		passphrase: '1234567890',
	}).toString();
	console.log("## [ECDSA] encryptedPriKeyPEM=", encryptedPriKeyPEM);

	const privateKey = elliptic.EllipticBase.LoadPrivateKey(encryptedPriKeyPEM, '1234567890')

	const plainPriKeyPEM2 = privateKey.export({
		format: elliptic.ECDSA.DefaultEncodeFormat,
		type: elliptic.ECDSA.DefaultPriKeyEncodeType,
	}).toString();

	assert.strictEqual(plainPriKeyPEM1, plainPriKeyPEM2);
})

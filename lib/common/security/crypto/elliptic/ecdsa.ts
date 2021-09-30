// ECDSA
// SafeCurves list: http://safecurves.cr.yp.to
// EC curve list: https://github.com/nodejs/node/blob/v16.10.0/deps/openssl/openssl/crypto/ec/ec_curve.c

import {createPublicKey, createSign, createVerify, generateKeyPairSync, KeyPairKeyObjectResult} from 'crypto';
import {EllipticBase} from './base';

export namespace ECDSA {
	export const DefaultCurveSecp256k1 = 'secp256k1';
	export const DefaultEncodeFormat = 'pem';
	export const DefaultPriKeyEncodeType = 'pkcs8';
	export const DefaultPubKeyEncodeType = 'spki';

	// NewKeyPair returns new EC key pair (curve secp256k1 by default)
	export function NewKeyPair(curve: string = DefaultCurveSecp256k1): KeyPairKeyObjectResult {
		return generateKeyPairSync('ec', {
			namedCurve: curve
		});
	}

	// Sign
	// data: something to sign
	// certificate: public key content (PEM)
	// hashAlgo: hash algorithm name (e.g. SHA256)
	// passphrase: if the private key is encrypted, a passphrase must be specified. The length of the passphrase is limited to 1024 bytes
	export function Sign(data: any, certificate: string, hashAlgo: string, passphrase?: string | Buffer): Buffer {
		const privateKey = EllipticBase.LoadPrivateKey(certificate, passphrase);

		const sign = createSign(hashAlgo);
		sign.write(data);
		sign.end();

		return sign.sign(privateKey);
	}

	// Verify signature
	// data: something to sign
	// certificate: public key content (PEM)
	// hashAlgo: hash algorithm name (e.g. SHA256)
	// sig: signature in HEX string
	export function Verify(data: any, certificate: string, sig: Buffer, hashAlgo: string): boolean {
		const publicKey = createPublicKey({
			key: certificate,
		})

		const verify = createVerify(hashAlgo);
		verify.write(data);
		verify.end();

		return verify.verify(publicKey, sig);
	}
}

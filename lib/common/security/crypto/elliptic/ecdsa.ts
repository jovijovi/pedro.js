// ECDSA
// SafeCurves list: http://safecurves.cr.yp.to
// EC curve list: https://github.com/nodejs/node/blob/v16.10.0/deps/openssl/openssl/crypto/ec/ec_curve.c

import {
	createPrivateKey,
	createPublicKey,
	createSign,
	createVerify,
	generateKeyPairSync,
	KeyPairKeyObjectResult
} from 'crypto';

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
	export function Sign(data: any, certificate: string, hashAlgo: string): Buffer {
		const privateKey = createPrivateKey({
			key: certificate,
		})

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

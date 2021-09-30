import crypto, {createPublicKey, generateKeyPairSync, KeyPairKeyObjectResult} from 'crypto';
import {EllipticBase} from './base';

export namespace ED25519 {
	export const DefaultEncodeFormat = 'pem';
	export const DefaultPriKeyEncodeType = 'pkcs8';
	export const DefaultPubKeyEncodeType = 'spki';

	// NewKeyPair returns new EdDSA 25519 key pair
	export function NewKeyPair(): KeyPairKeyObjectResult {
		return generateKeyPairSync('ed25519');
	}

	// Sign
	// data: something to sign
	// certificate: public key content (PEM)
	// passphrase: if the private key is encrypted, a passphrase must be specified. The length of the passphrase is limited to 1024 bytes
	export function Sign(data: any, certificate: string, passphrase?: string | Buffer): Buffer {
		const privateKey = EllipticBase.LoadPrivateKey(certificate, passphrase);

		return crypto.sign(null, Buffer.from(data), privateKey);
	}

	// Verify signature
	// data: something to sign
	// certificate: public key content (PEM)
	// sig: signature in HEX string
	export function Verify(data: any, certificate: string, sig: Buffer): boolean {
		const publicKey = createPublicKey({
			key: certificate,
		})

		return crypto.verify(null, Buffer.from(data), publicKey, sig);
	}
}

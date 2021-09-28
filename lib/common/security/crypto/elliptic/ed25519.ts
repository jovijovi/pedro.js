import crypto, {createPrivateKey, createPublicKey, generateKeyPairSync, KeyPairKeyObjectResult} from 'crypto';

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
	// hashAlgo: hash algorithm name (Optional)
	export function Sign(data: any, certificate: string, hashAlgo?: string): Buffer {
		const privateKey = createPrivateKey({
			key: certificate,
		})

		return crypto.sign(null, Buffer.from(data), privateKey);
	}

	// Verify signature
	// data: something to sign
	// certificate: public key content (PEM)
	// sig: signature in HEX string
	// hashAlgo: hash algorithm name (Optional)
	export function Verify(data: any, certificate: string, sig: Buffer, hashAlgo?: string): boolean {
		const publicKey = createPublicKey({
			key: certificate,
		})

		return crypto.verify(null, Buffer.from(data), publicKey, sig);
	}
}

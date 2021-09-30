import {createPrivateKey, KeyObject} from 'crypto';

export namespace EllipticBase {
	// LoadPrivateKey returns private key
	// key: private key
	// passphrase: if the private key is encrypted, a passphrase must be specified. The length of the passphrase is limited to 1024 bytes
	export function LoadPrivateKey(key: string | Buffer, passphrase?: string | Buffer): KeyObject {
		return createPrivateKey({
			key: key,
			passphrase: passphrase,
		})
	}
}

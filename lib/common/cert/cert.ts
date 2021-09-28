import {KeyObject, X509Certificate} from 'crypto';

// LoadPublicKey returns the certificate public key
export function LoadPublicKey(certificate: string): KeyObject {
	const x509 = new X509Certificate(certificate);
	return x509.publicKey;
}

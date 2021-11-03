import {BinaryLike, randomBytes} from 'crypto';

// Minimal salt size in bytes
const minSaltSize = 16;

// Default salt size
const defaultSaltSize = 64;

// NewSalt returns the salt value of the specified size.
// The salt should be as unique as possible. It is recommended that a salt is random and at least 16 bytes long.
// See NIST SP 800-132 for details. ref: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
export function NewSalt(size: number = defaultSaltSize): BinaryLike {
	if (size < minSaltSize) {
		throw new Error("Salt size at least 16 bytes long")
	}

	return randomBytes(size);
}

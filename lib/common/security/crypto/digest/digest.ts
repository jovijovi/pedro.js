import {BinaryLike, createHash} from 'crypto';

// Get returns hash buffer
export function Get(data: BinaryLike, alg: string): Buffer {
	const hash = createHash(alg);
	hash.update(data);
	return hash.digest();
}

// GetString returns hash string
export function GetString(data: BinaryLike, alg: string): string {
	return Get(data, alg).toString('hex');
}

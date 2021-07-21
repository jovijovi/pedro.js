import {BinaryLike, createHash} from 'crypto';

export function Get(data: BinaryLike, alg: string): string {
	const hash = createHash(alg);
	hash.update(data);
	return hash.digest('hex');
}

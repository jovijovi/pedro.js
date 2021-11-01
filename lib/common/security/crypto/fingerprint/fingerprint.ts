import {BinaryLike} from 'crypto';
import {GetString} from '../digest';

// Get returns the fingerprint of data
export function Get(data: BinaryLike, alg: string): string {
	return GetString(data, alg);
}

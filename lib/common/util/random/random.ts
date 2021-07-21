import * as crypto from 'crypto';

// RandIntBetween random int, range: [0, n)
export function RandIntBetween(min, max: number): number {
	return crypto.randomInt(min, max);
}

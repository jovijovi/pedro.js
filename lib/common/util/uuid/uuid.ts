import {randomUUID} from 'crypto';
import * as random from '../random';

// NewUUID returns uuid (version 4 by default)
export function NewUUID(): string {
	return randomUUID();
}

// NewUUID32bits new UUID without "-"
export function NewUUID32bits(): string {
	return NewUUID().replace(/-/gi, '');
}

// CustomUUID generate UUID(v4) with specified length
export function CustomUUID(length: number): string {
	return NewUUID().substring(0, length);
}

// CustomUUIDWithRandCase generate UUID(v4) with specified length and random case
export function CustomUUIDWithRandCase(length: number): string {
	return random.RandCase(NewUUID().substring(0, length));
}

import * as crypto from 'crypto';
import {MaxEntropyLength} from './params';

// RandIntBetween random int, range: [0, n)
export function RandIntBetween(min, max: number): number {
	return crypto.randomInt(min, max);
}

// RandBoolean random boolean, range: [true, false]
export function RandBoolean(): boolean {
	return RandIntBetween(0, 2) > 0;
}

// RandCase random letter case of string
export function RandCase(input: string): string {
	let output = '';

	for (let i = 0; i < input.length; i++) {
		if (RandBoolean()) {
			output += input[i].toUpperCase();
		} else {
			output += input[i].toLowerCase();
		}
	}

	return output;
}

// RandUppercase random letter uppercase of string
export function RandUppercase(input: string): string {
	let output = '';

	for (let i = 0; i < input.length; i++) {
		if (RandBoolean()) {
			output += input[i].toUpperCase();
		} else {
			output += input[i];
		}
	}

	return output;
}

// RandLowercase random letter lowercase of string
export function RandLowercase(input: string): string {
	let output = '';

	for (let i = 0; i < input.length; i++) {
		if (RandBoolean()) {
			output += input[i].toLowerCase();
		} else {
			output += input[i];
		}
	}

	return output;
}

// RandSeed returns a random seed
export function RandSeed(): string {
	return String.fromCharCode(...crypto.randomFillSync(new Uint8Array(MaxEntropyLength)));
}

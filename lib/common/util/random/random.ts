import * as crypto from 'crypto';
import {MaxEntropyLength} from './params';

// RandIntBetween return random int in range: [min, max)
export function RandIntBetween(min, max: number): number {
	return crypto.randomInt(min, max);
}

// RandUIntBetween return random uint in range: [min, max)
export function RandUIntBetween(min, max: number): number {
	if (min < 0 || max < 0) {
		throw new Error(`invalid range`);
	}
	return crypto.randomInt(min, max);
}

// RandBoolean return random boolean in range: [true, false]
export function RandBoolean(): boolean {
	return RandIntBetween(0, 2) > 0;
}

// RandCase return a string of random uppercase and lowercase letters
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

// RandUppercase return a string of random uppercase letters
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

// RandLowercase return a string of random lowercase letters
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

// RandSeed return a random string seed
export function RandSeed(): string {
	return String.fromCharCode(...crypto.randomFillSync(new Uint8Array(MaxEntropyLength)));
}

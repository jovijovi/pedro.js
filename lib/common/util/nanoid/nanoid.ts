import {customAlphabet} from 'nanoid';
import {Options} from './options';

const DefaultAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';
const DefaultSize = 32;

function nanoid(alphabet = DefaultAlphabet, size = DefaultSize): (size?: number) => string {
	return customAlphabet(alphabet, size);
}

export function NewNanoID(opts: Options = {alphabet: DefaultAlphabet, size: DefaultSize}): string {
	if (!opts) {
		return nanoid(DefaultAlphabet, DefaultSize)();
	}

	return nanoid(opts.alphabet ? opts.alphabet : DefaultAlphabet, opts.size ? opts.size : DefaultSize)();
}

export function BatchNewNanoID(amount = 1, opts: Options = {alphabet: DefaultAlphabet, size: DefaultSize}): string[] {
	const rsp: string[] = [];
	for (let i = 0; i < amount; i++) {
		rsp.push(NewNanoID(opts));
	}
	return rsp;
}

import {auditor} from '../../lib/common';

test('Check', () => {
	auditor.Check(1 + 1 === 2, "1+1=2");

	const foo = '';
	try {
		auditor.Check(foo, "foo is empty");
	} catch (e) {
		console.debug("Catch Error=", e);
	}
})

test('Assert Check', () => {
	const foo = '';
	auditor.OnlyValid(foo).Check(foo.length === 1, "length not 1");

	const alpha = 0;
	auditor.OnlyValid(alpha).Check(alpha > 1, "alpha must > 1");

	const beta = 1;
	try {
		auditor.OnlyValid(beta).Check(beta > 1, "beta must > 1");
	} catch (e) {
		console.debug("Catch Error=", e);
	}

	let delta = undefined;
	try {
		auditor.OnlyValid(delta).Check(delta.length > 0, "length must > 0");
	} catch (e) {
		console.debug("Catch Error=", e);
	}
})

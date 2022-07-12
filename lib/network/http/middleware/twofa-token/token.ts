import {env} from 'process';
import {twofa} from '@jovijovi/two-fa.js';

const key = env.AUTH_2FA_KEY;
const defaultHeader = 'Authorization';
const maxCodeLimit = 2;
const validCode: string[] = [];

const timer = setInterval(() => {
	if (!key) {
		clearInterval(timer);
		return;
	}

	validCode.push(twofa.GetCode(key));

	if (validCode.length > maxCodeLimit) {
		validCode.shift();
	}
}, 30 * 1000);

export function TwoFAToken(req, res, next) {
	if (!key) {
		next();
		return;
	}

	const authCode = req.get(defaultHeader);

	if (validCode.length === 0) {
		validCode.push(twofa.GetCode(key));
	}

	if (!validCode.includes(authCode)) {
		res.status(403).send({
			error: 'Forbidden',
		});
		return;
	}

	next();
}

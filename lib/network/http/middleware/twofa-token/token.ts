import {env} from 'process';
import {twofa} from '@jovijovi/two-fa.js';
import cron = require('node-schedule');

const key = env.AUTH_2FA_KEY;
const defaultHeader = 'Authorization';
const maxCodeLimit = 2;
const validCode: string[] = [];

cron.scheduleJob('*/30 * * * * *', function () {
	if (!key) {
		cron.gracefulShutdown();
		return;
	}

	validCode.push(twofa.GetCode(key));

	if (validCode.length > maxCodeLimit) {
		validCode.shift();
	}
});

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

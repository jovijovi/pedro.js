// Response Builder

import * as log from '@jovijovi/pedrojs-common/log';

// BuildResponse returns response by params
export function BuildResponse(code: string, msg: string, body: any): any {
	return {
		code: code,
		msg: msg,
		body: body
	};
}

export function BadRequest(res): any {
	return res.status(400).send({
		error: 'Bad request',
	});
}

export function NotFound(res): any {
	return res.status(404).send({
		error: 'Not found',
	});
}

export function Error(res, e): any {
	if (e && e.code && e.message) {
		log.RequestId().error("code=%s, message=%s", e.code, e.message);
	}

	let httpStatusCode = 500;
	if (e.message.toString().includes('Not found')) {
		httpStatusCode = 404;
	}

	return res.status(httpStatusCode).send({
		code: e.code,
		error: e.message,
	});
}

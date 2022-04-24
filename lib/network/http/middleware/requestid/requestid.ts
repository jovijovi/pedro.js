import {customAlphabet} from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 32);

const defaultHeader = 'X-Request-Id';

export function RequestID(req, res, next) {
	const requestIdInHeader = req.get(defaultHeader);
	const id = requestIdInHeader === undefined ? nanoid() : requestIdInHeader;
	res.set(defaultHeader, id);
	req.requestId = id

	next();
}

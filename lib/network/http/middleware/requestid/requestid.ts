import {customAlphabet} from 'nanoid';

const defaultAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';
const defaultSize = 32;
const defaultHeader = 'X-Request-Id';
export const KEY = 'RequestId';

const nanoid = customAlphabet(defaultAlphabet, defaultSize);

export function RequestID(req, res, next) {
	const reqIdFromHeader = req.get(defaultHeader);
	const reqId = reqIdFromHeader === undefined ? nanoid() : reqIdFromHeader;
	res.set(defaultHeader, reqId);
	req[KEY] = reqId;
	next();
}

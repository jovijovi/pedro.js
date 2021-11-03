import {BinaryLike, pbkdf2Sync} from 'crypto';
import {Check} from '../../../auditor';

// Minimal iteration count
// The minimal number of times that the pseudorandom function is called to generate a block of keying material.
// ref: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
const minIterationCount = 1000;

// Default iteration count
// The recommend number of times that the pseudorandom function is called to generate a block of keying material.
// ref: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
export const DefaultIterationCount = 10000000;

export const DefaultDigest = "sha512";

// params interface
export interface IEncryptParams {
	password: BinaryLike;
	salt: BinaryLike;
	keyLen: number;
	iterations?: number;
	digest?: string;
}

export interface IVerifyParams extends IEncryptParams {
	cipherText: BinaryLike;
}

// EncryptPassword
export async function EncryptPassword(params: IEncryptParams): Promise<Buffer> {
	params = setDefaultParams(params);

	checkEncryptParams(params);

	try {
		return pbkdf2Sync(params.password, params.salt, params.iterations, params.keyLen, params.digest);
	} catch (e) {
		throw new Error(e);
	}
}

// VerifyPassword
// Returns true if verify succeed
// Returns false if verify failed
export async function VerifyPassword(params: IVerifyParams): Promise<boolean> {
	checkVerifyParams(params);

	// Encrypt password
	const key = await EncryptPassword(params);

	// Compare key with cipherText
	if (typeof (params.cipherText) === "string") {
		return key.compare(Buffer.from(params.cipherText, 'hex')) == 0;
	}
	return key.compare(Buffer.from(params.cipherText as Uint8Array)) == 0;
}

function setDefaultParams(params: IEncryptParams): IEncryptParams {
	// If iterations empty, set DefaultIterationCount
	params.iterations = params.iterations ? params.iterations : DefaultIterationCount

	// If digest empty, set DefaultDigest
	params.digest = params.digest ? params.digest : DefaultDigest;

	return params;
}

function checkEncryptParams(params: IEncryptParams) {
	Check(params.password, "Password is empty");
	Check(params.salt, "Salt is empty");
	Check(params.keyLen > 0, "Key length must > 0");
	Check(params.iterations >= minIterationCount, "Iteration count at least 1000");
}

function checkVerifyParams(params: IVerifyParams) {
	Check(params.cipherText, "Cipher text is empty");
}

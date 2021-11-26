import readline from 'readline';
import fs from 'fs';
import * as digest from '../../security/crypto/digest';

// ReadDedupeLineToMap returns dedupe line from the file
export async function ReadDedupeLineToMap(filename: string): Promise<Map<any, any>> {
	if (!filename) {
		return null;
	}

	const rl = readline.createInterface({
		input: fs.createReadStream(filename, 'utf8'),
		crlfDelay: Infinity,
	});

	if (!rl) {
		return null;
	}

	const lineMap = new Map();

	for await (const line of rl) {
		lineMap.set(digest.GetString(line, 'sha256'), line);
	}

	rl.close();

	return lineMap;
}

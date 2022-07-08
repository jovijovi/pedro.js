import {util} from '../../lib/common';
import * as assert from 'assert';

test('ReadDedupeLineToMap', async () => {
	let map = await util.file.ReadDedupeLineToMap('./test/mock/dedupe_line_file.txt');
	console.log("Map=", map);
})

test('Error: ReadDedupeLineToMap with invalid filename', async () => {
	const map1 = await util.file.ReadDedupeLineToMap('');
	console.log("Map1=", map1);
	assert.strictEqual(map1, null);

	try {
		await util.file.ReadDedupeLineToMap('./test/mock/none_exist_file.txt');
	} catch (e) {
		console.debug("Expected Error=", e);
	}
})

import * as file from '../../lib/common/util/file';

test('ReadDedupeLineToMap', async () => {
	let map = await file.ReadDedupeLineToMap('./test/mock/dedupe_line_file.txt');
	console.log("Map=", map);
})

import {util} from '../../lib/common';

test('ReadDedupeLineToMap', async () => {
	let map = await util.file.ReadDedupeLineToMap('./test/mock/dedupe_line_file.txt');
	console.log("Map=", map);
})

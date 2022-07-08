import * as assert from 'assert';
import {Version} from '../../lib/common/version';

test('GetVersionInfo', () => {
	const version = Version.GetVersionInfo();
	console.log(version);
	assert.notStrictEqual(version, undefined);
})

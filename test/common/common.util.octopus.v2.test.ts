import {Octopus} from '../../lib/common/util/octopus/v2';
import assert from 'assert';

/*
     3
   /   \
  1 --- 2 -- 2.1 -- 2.2 -- 2.3
*/
test('New Octopus', () => {
	const o = new Octopus(1);
	assert.notStrictEqual(o, undefined);
	const n2 = o.Add(2);
	o.Add(3);
	console.log("Octopus=%o", o);
})

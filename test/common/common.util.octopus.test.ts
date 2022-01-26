import {Octopus, Parallel} from '../../lib/common/util/octopus';
import assert from 'assert';

/*
     3
   /   \
  1 --- 2 -- 2.1 -- 2.2 -- 2.3
*/
test('New Octopus', () => {
	const o = new Octopus(1);
	assert.notStrictEqual(o, undefined);
	const n2 = o.Push(2);
	n2.Append(2.1, Parallel).Append(2.2).Append(2.3);
	o.Push(3);
	console.log("Octopus=%o", o);
})

/*
  1 --- 2
*/
test('Get Head', () => {
	const o = new Octopus("1");
	o.Push("2");
	const head = o.Head();
	console.log("Head=%o", head);
	assert.strictEqual(head.payload.value, "1");
})

/*
  1 --- 2
*/
test('Get Tail', () => {
	const o = new Octopus("1");
	o.Push("2");
	const tail = o.Tail();
	console.log("Head=%o", tail);
	assert.strictEqual(tail.payload.value, "2");
})

/*
       4
     /   \
    /     \
   /       \
  5 ------- 3
   \       /
    1 --- 2
*/
test('Link Node', () => {
	const o = new Octopus("1");
	o.Push("2");
	const n3 = o.Push("3");
	o.Push("4");
	const n5 = o.Push("5");
	n5.Link(n3, "new link");

	console.log("n3=%o", n3);
	console.log("n5=%o", n5);
})

/*
     3
   /   \
  1 --- 2
*/
test('Get out degree', () => {
	const o = new Octopus(1);
	const n2 = o.Push(2);
	const n3 = o.Push(3);

	const outDegree1 = o.Head().OutDegree();
	const outDegree2 = n2.OutDegree();
	const outDegree3 = n3.OutDegree();

	console.log("Head=%o", o.Head());
	console.log("OutDegree1=", outDegree1);
	console.log("OutDegree2=", outDegree2);
	console.log("OutDegree3=", outDegree3);

	assert.strictEqual(outDegree1, 2);
	assert.strictEqual(outDegree2, 2);
	assert.strictEqual(outDegree3, 2);
})

/*
       4
     /   \
    /     \
   /       \
  5         3
   \       /
    1 --- 2
*/
test('Iterator', () => {
	const o = new Octopus("1");
	o.Push("2");
	o.Push("3");
	o.Push("4");
	o.Push("5");

	let count = 0;
	for (const n of o.Entries()) {
		console.log("n=", n.payload.value);
		count++;
	}
	assert.strictEqual(count, 5);
})

/*
       x.3
       /
     x.2
     /
   x.1
   /
  1 --- 2 -- y.1 -- y.2
  |     |
  |     |
  4 --- 3 -- z.1 -- z.2 -- z.3 -- z.4
   \
   alpha.1
     \
     alpha.2 -- beta.1
*/
test('Create a big octopus', () => {
	const octopus = new Octopus("1");
	octopus.Push("2").Append("y.1", "y").Append("y.2");
	const cell3 = octopus.Push("3");
	const cell4 = octopus.Push("4");

	octopus.Head().Append("x.1", "x").Append("x.2").Append("x.3");
	cell3.Append("z.1", "z").Append("z.2").Append("z.3").Append("z.4");

	const alpha2 = cell4.Append("alpha.1", "alpha").Append("alpha.2");
	alpha2.Append("beta.1", "beta");

	console.log("BigOctopus=%o", octopus);
	for (const cell of octopus.Entries()) {
		console.log("Cell=%o", cell);
	}

	for (const n of alpha2.Entries()) {
		console.log("n=%o", n);
	}

	for (const n of alpha2.Entries("beta")) {
		console.log("n=%o", n);
	}
})

/*
     e--------f
    /|       /|
   / |      / |
  a--------b  |
  |  |     |  |
  |  h-----|--g
  | /      | /
  |/       |/
  d--------c
*/
test('Create a cube', () => {
	const cube = new Octopus('a');
	const e = cube.Head().Append('e', 'ae');
	const f = cube.Push('b').Append('f', 'bf');
	const g = cube.Push('c').Append('g', 'cg');
	const h = cube.Push('d').Append('h', 'dh');

	e.Link(f, 'ef');
	f.Link(g, 'fg');
	g.Link(h, 'gh');
	h.Link(e, 'he');

	console.log("Cube=%o", cube);
})

/*
  H   H
   \ /
    O
*/
test('Create a water molecule (H2O)', () => {
	const water = new Octopus('O');
	water.Head().Append('H', 'left H bond');
	water.Head().Append('H', 'right H bond');

	console.log("Water=%o", water);

	for (let atom of water.Head().Links()) {
		console.log("Atom=%o", atom);
	}
})

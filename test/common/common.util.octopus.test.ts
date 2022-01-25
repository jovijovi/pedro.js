import {Octopus, Parallel} from '../../lib/common/util/octopus';

test('New Octopus', () => {
	const o = new Octopus(1);
	const n2 = o.Push(2);
	n2.Append(2.1, Parallel).Append(2.2).Append(2.3);
	const n3 = o.Push(3);
	console.log("Octopus=%o", o);
})

test('Get Head', () => {
	const o = new Octopus("1");
	o.Push("2");
	console.log("Head=%o", o.Head());
})

test('Get Tail', () => {
	const o = new Octopus("1");
	o.Push("2");
	console.log("Head=%o", o.Tail());
})

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

test('Iterator', () => {
	const o = new Octopus("1");
	o.Push("2");
	o.Push("3");
	o.Push("4");
	o.Push("5");

	for (const n of o) {
		console.log(n);
	}
})

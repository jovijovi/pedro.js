import {context, util} from '../../lib/common';

test('NewContext', () => {
	// New context by default
	const ctx1 = context.NewContext();
	ctx1.context.set('key1', 'value1');
	const value1 = ctx1.context.get('key1');
	console.log("Context(%s) key1 -> %s", ctx1.id, value1);
	expect(value1).toMatch('value1');

	// New context by id
	const ctx2 = context.NewContext({id: '42'});
	ctx2.context.set('key2', 'value2');
	const value2 = ctx2.context.get('key2');
	console.log("Context(%s) key2 -> %s", ctx2.id, value2);
	expect(value2).toMatch('value2');

	// New child context
	const ctx3 = context.NewContext({
		parent: ctx2,
		id: '43',
	})
	ctx3.WithValue('key3', 'value3');
	const value3 = ctx3.context.get('key3');
	const parentValue2 = ctx3.parent.context.get('key2');
	console.log("Context(%s) key3 -> %s", ctx3.id, value3);
	console.log("Context(%s)'s parent(%s) Key2 -> %s", ctx3.id, ctx3.parent.id, parentValue2);
	expect(value3).toMatch('value3');
	expect(parentValue2).toMatch('value2');
})

test('Born Context Chain', () => {
	// Born 1st generation
	const ctx5 = context.Born({
		length: 5,
		idProvider: util.uuid.NewUUID32bits,
	});
	console.log("Tree=%o", ctx5);

	for (let i = 0; i < 5; i++) {
		const id = ctx5.Trace(i).id;
		console.log("index=%d Id=%s", i, id);
	}
	const chainHead = ctx5.Head();
	console.log("Chain head=%s", ctx5.Head().id)
	console.log("Chain tail=%s", ctx5.id)

	// Born 2nd generation
	const ctx10 = context.Born({
		length: 10,
		parent: ctx5,
	});
	console.log("Tree=%o", ctx10);

	for (let i = 5; i < 10; i++) {
		const id = ctx10.Trace(i).id;
		console.log("index=%d Id=%s", i, id);
	}
	console.log("Chain head=%s", ctx10.Head().id)
	console.log("Chain tail=%s", ctx10.id)
	expect(chainHead.id).toMatch(ctx10.Head().id)

	// Born the next one
	const ctx11 = context.Born({
		length: ctx10.Length() + 1,
		parent: ctx10,
	});
	console.log("Tree=%o", ctx11);

	for (let i = 10; i < 11; i++) {
		const id = ctx11.Trace(i).id;
		console.log("index=%d Id=%s", i, id);
	}
	console.log("Chain head=%s", ctx11.Head().id)
	console.log("Chain tail=%s", ctx11.id)
	expect(chainHead.id).toMatch(ctx11.Head().id)

	// A new chain fork
	const ctx12 = context.Born({
		length: ctx10.Length() + 1,
		parent: ctx10,
	});
	console.log("Tree=%o", ctx12);
	console.log("index=%d Id=%s", 10, ctx12.Trace(10).id);
	console.log("Chain head=%s", ctx12.Head().id)
	console.log("Chain tail=%s", ctx12.id)
	expect(chainHead.id).toMatch(ctx12.Head().id)
})

test('Born context chain with random ID provider', () => {
	const ctx = context.Born({
		length: 5,
	});
	console.log("Head=", ctx.Head().id);
	console.log("Tail=", ctx.id)
})

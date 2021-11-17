import {NewContext} from '../lib/common/context';

test('NewContext', () => {
	// New context by default
	const ctx1 = NewContext();
	ctx1.context.set('key1', 'value1');
	const value1 = ctx1.context.get('key1');
	console.log("Context(%s) Key1=%s", ctx1.id, value1);
	expect(value1).toMatch('value1');

	// New context by id
	const ctx2 = NewContext({id: '42'});
	ctx2.context.set('key2', 'value2');
	const value2 = ctx2.context.get('key2');
	console.log("Context(%s) Key2=%s", ctx2.id, value2);
	expect(value2).toMatch('value2');

	// New child context
	const ctx3 = NewContext({
		parent: ctx2,
		id: '43',
	})
	ctx3.context.set('key3', 'value3');
	const value3 = ctx3.context.get('key3');
	const parentValue2 = ctx3.parent.context.get('key2');
	console.log("Context(%s) Key3=%s", ctx3.id, value3);
	console.log("Context(%s)'s parent(%s) Key2=%s", ctx3.id, ctx3.parent.id, parentValue2);
	expect(value3).toMatch('value3');
	expect(parentValue2).toMatch('value2');
})


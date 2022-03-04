import {util} from '../../lib/common';

test('New Queue', () => {
	const stack = new util.Stack(2);
	stack.Push(1);
	stack.Push('2');
	stack.Push('3');
	const val = stack.Pop();
	console.log("Length=", stack.Length());
	console.log("Stack=", stack);
	console.log("PopVal=%o", val);
})

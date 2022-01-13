import {Queue} from '../../lib/common/util/queue';
import assert from 'assert';

test('New Queue', () => {
	const queue = new Queue(2);
	queue.Push('1');
	queue.Push('2');
	queue.Push('3');
	console.log("Length=", queue.Length());
	console.log("Queue=", queue);
	console.log("First=", queue.First());
	assert.strictEqual(queue.First(), '2');
	assert.strictEqual(queue.Length(), 2);

	queue.Shift();
	console.log("Queue(after shift)=", queue);
	console.log("First(after shift)=", queue.First());
	assert.strictEqual(queue.First(), '3');
	assert.strictEqual(queue.Length(), 1);
})

test('Unlimited Queue', () => {
	const queue = new Queue();
	queue.Push('1');
	queue.Push(2);
	queue.Push(3.14);
	queue.Push({name: 'John'});
	console.log("Queue=", queue);
	assert.strictEqual(queue.Length(), 4);
})

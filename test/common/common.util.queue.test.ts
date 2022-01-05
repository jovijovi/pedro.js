import {Queue} from '../../lib/common/util/queue';

test('New Queue', () => {
	const queue = new Queue(2);
	queue.Push('1');
	queue.Push('2');
	queue.Push('3');
	console.log("Length=", queue.Length());
	console.log("Queue=", queue);
})

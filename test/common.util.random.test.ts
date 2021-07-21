import * as random from '../lib/common/util/random';
import * as log from '../lib/common/log';
import * as assert from 'assert';

test('RandIntBetween', () => {
	for (let i = 0; i < 10; i++) {
		const result = random.RandIntBetween(0, 3);
		assert.notStrictEqual(result, 3);
		log.RequestId().info(random.RandIntBetween(0, 3));
	}
})

test('RandBoolean', () => {
	for (let i = 0; i < 10; i++) {
		const result = random.RandBoolean();
		log.RequestId().info(result);
	}
})

test('RandCase', () => {
	for (let i = 0; i < 10; i++) {
		const result = random.RandCase('a0b1c2d3e4f5. "测试');
		log.RequestId().info(result);
	}
})

test('RandUppercase', () => {
	for (let i = 0; i < 10; i++) {
		const result = random.RandUppercase('a0b1c2d3e4f5. "测试');
		log.RequestId().info(result);
	}
})

test('RandLowercase', () => {
	for (let i = 0; i < 10; i++) {
		const result = random.RandLowercase('A0B1C2D3E4F5. "测试');
		log.RequestId().info(result);
	}
})

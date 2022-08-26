import {log, util} from '../../lib/common';
import * as assert from 'assert';

test('RandIntBetween', () => {
	for (let i = 0; i < 10; i++) {
		const result = util.random.RandIntBetween(0, 3);
		assert.notStrictEqual(result, 3);
		log.RequestId().info(util.random.RandIntBetween(0, 3));
	}
})

test('RandUIntBetween', () => {
	for (let i = 0; i < 10; i++) {
		const result = util.random.RandUIntBetween(0, 3);
		assert.notStrictEqual(result, 3);
		log.RequestId().info(util.random.RandUIntBetween(0, 3));
	}

	try {
		console.debug(util.random.RandUIntBetween(-1, 1));
	} catch (e) {
		console.debug("Expected error=", e);
	}
})

test('RandBoolean', () => {
	for (let i = 0; i < 10; i++) {
		const result = util.random.RandBoolean();
		log.RequestId().info(result);
	}
})

test('RandCase', () => {
	for (let i = 0; i < 10; i++) {
		const result = util.random.RandCase('a0b1c2d3e4f5. "测试');
		log.RequestId().info(result);
	}
})

test('RandUppercase', () => {
	for (let i = 0; i < 10; i++) {
		const result = util.random.RandUppercase('a0b1c2d3e4f5. "测试');
		log.RequestId().info(result);
	}
})

test('RandLowercase', () => {
	for (let i = 0; i < 10; i++) {
		const result = util.random.RandLowercase('A0B1C2D3E4F5. "测试');
		log.RequestId().info(result);
	}
})

test('RandSeed', () => {
	for (let i = 0; i < 10; i++) {
		const seed = util.random.RandSeed();
		log.RequestId().info("Seed=%o", seed);
	}
})

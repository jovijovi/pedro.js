import * as random from '../lib/common/util/random';
import * as log from '../lib/common/log';
import * as assert from 'assert';

test('RandIntBetween', () => {
    for (let i = 0; i <= 10; i++) {
        let result = random.RandIntBetween(0, 3)
        assert.notStrictEqual(result, 3);
        log.RequestId().info(random.RandIntBetween(0, 3))
    }
})

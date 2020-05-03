import test from 'ava'

/**
 * Library under test
 */

import chromepass from '../src/chromepass'

test.todo('test chromepass')

test('chromepass.add(1, 3) 4', t => {
  t.is(chromepass.add(1, 3), 4)
})

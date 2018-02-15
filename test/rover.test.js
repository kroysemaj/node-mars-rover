// test/rover.test.js
const test = require('ava')
const rover = require('../src/rover')

test('We can get a rover', (t) => {
  t.deepEqual(rover(), {
    x: 0,
    y: 0,
    heading: 'N'
  })
})

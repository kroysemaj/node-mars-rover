/*
 * Develop an api that moves a rover around on a grid.
 * √ - You are given the initial starting point (x,y) of a rover and the
 * direction (N,S,E,W) it is facing.
 * √ - The rover receives a character array of commands.
 * √ - Implement commands that move the rover forward/backward (f,b).
 * √ - Implement commands that turn the rover left/right (l,r).
 * √ - Implement wrapping from one edge of the grid to another. (planets
 * are spheres after all)
 * - Implement obstacle detection before each move to a new square. If a
 * given sequence of commands encounters an obstacle, the rover moves up
 * to the last possible point and reports the obstacle.
 */

const test = require('ava')
const rover = require('../src/rover')

test('We can get a default rover by calling the module with no args', (t) => {
  t.deepEqual(rover.init(), {
    coords: {
      x: 0,
      y: 0
    },
    heading: 'N'
  })
})

test('We can get a custom rover by calling the module with args', (t) => {
  t.deepEqual(rover.init(1, 1, 'S'), {
    coords: {
      x: 1,
      y: 1
    },
    heading: 'S'
  })
})

test('If we pass zero commands, we get the same rover back', (t) => {
  const myRover = rover.init()
  t.deepEqual(rover.processCommand('', myRover), {
    coords: {
      x: 0,
      y: 0
    },
    heading: 'N'
  })
})

test('Rover can turn right', (t) => {
  const myRover = rover.init()
  t.deepEqual(rover.processCommand('r', myRover), {
    coords: {
      x: 0,
      y: 0
    },
    heading: 'E'
  })
})

test('Rover can turn left', (t) => {
  const myRover = rover.init()
  t.deepEqual(rover.processCommand('l', myRover), {
    coords: {
      x: 0,
      y: 0
    },
    heading: 'W'
  })
})

test('Rover can move forward when facing North', (t) => {
  let myRover = rover.init(1, 1, 'N')
  t.deepEqual(rover.processCommand('f', myRover), {
    coords: {
      x: 1,
      y: 2
    },
    heading: 'N'
  })
})

test('Rover can move forward when facing East', (t) => {
  let myRover = rover.init(1, 1, 'E')
  t.deepEqual(rover.processCommand('f', myRover), {
    coords: {
      x: 2,
      y: 1
    },
    heading: 'E'
  })
})

test('Rover can move forward when facing South', (t) => {
  let myRover = rover.init(1, 1, 'S')
  t.deepEqual(rover.processCommand('f', myRover), {
    coords: {
      x: 1,
      y: 0
    },
    heading: 'S'
  })
})

test('Rover can move forward when facing West', (t) => {
  let myRover = rover.init(1, 1, 'W')
  t.deepEqual(rover.processCommand('f', myRover), {
    coords: {
      x: 0,
      y: 1
    },
    heading: 'W'
  })
})

test('Rover can move backward when facing North', (t) => {
  let myRover = rover.init(1, 1, 'N')
  t.deepEqual(rover.processCommand('b', myRover), {
    coords: {
      x: 1,
      y: 0
    },
    heading: 'N'
  })
})

test('Rover can move backward when facing East', (t) => {
  let myRover = rover.init(1, 1, 'E')
  t.deepEqual(rover.processCommand('b', myRover), {
    coords: {
      x: 0,
      y: 1
    },
    heading: 'E'
  })
})

test('Rover can move backward when facing South', (t) => {
  let myRover = rover.init(1, 1, 'S')
  t.deepEqual(rover.processCommand('b', myRover), {
    coords: {
      x: 1,
      y: 2
    },
    heading: 'S'
  })
})

test('Rover can move backward when facing West', (t) => {
  let myRover = rover.init(1, 1, 'W')
  t.deepEqual(rover.processCommand('b', myRover), {
    coords: {
      x: 2,
      y: 1
    },
    heading: 'W'
  })
})

test('Rover can recieve multiple commands (no wrapping)', (t) => {
  const myRover = rover.init(1, 1, 'N')
  const moves = ['f', 'r', 'f']
  t.deepEqual(rover.executeCommands(moves, myRover), {
    coords: {
      x: 2,
      y: 2
    },
    heading: 'E'
  })
})

test('Rover can recieve more complex commands (no wrapping)', (t) => {
  const myRover = rover.init(1, 1, 'N')
  const moves = ['r', 'f', 'l', 'f', 'f', 'l', 'f', 'f', 'l', 'b', 'b', 'r', 'b']
  t.deepEqual(rover.executeCommands(moves, myRover), {
    coords: {
      x: 1,
      y: 5
    },
    heading: 'W'
  })
})

test('Rover wraps around the map when exceeding the grid\'s north boundary', (t) => {
  const myRover = rover.init(10, 10, 'N')
  const moves = ['f']
  t.deepEqual(rover.executeCommands(moves, myRover), {
    coords: {
      x: 10,
      y: 0
    },
    heading: 'N'
  })
})

test('Rover wraps around the map when exceeding the grid\'s south boundary', (t) => {
  const myRover = rover.init(10, 0, 'S')
  const moves = ['f']
  t.deepEqual(rover.executeCommands(moves, myRover), {
    coords: {
      x: 10,
      y: 10
    },
    heading: 'S'
  })
})

test('Rover wraps around the map when exceeding the grid\'s east boundary', (t) => {
  const myRover = rover.init(10, 10, 'E')
  const moves = ['f']
  t.deepEqual(rover.executeCommands(moves, myRover), {
    coords: {
      x: 0,
      y: 10
    },
    heading: 'E'
  })
})

test('Rover wraps around the map when exceeding the grid\'s west boundary', (t) => {
  const myRover = rover.init(0, 10, 'W')
  const moves = ['f']
  t.deepEqual(rover.executeCommands(moves, myRover), {
    coords: {
      x: 10,
      y: 10
    },
    heading: 'W'
  })
})

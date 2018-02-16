module.exports = {
  init: init,
  processCommand: processCommand, // exposed for testing
  executeCommands: executeCommands
}

function init (x = 0, y = 0, heading = 'N') {
  return {
    coords: {
      x: x,
      y: y
    },
    heading: heading
  }
}

function executeCommands (commands, rover) {
  return commands.reduce((rover, command) => {
    return processCommand(command, rover)
  }, rover)
}

function processCommand (command, rover) {
  if (!command) {
    return rover
  }

  if (command === 'f' || command === 'b') {
    rover.coords = handleLongitudinalMovement(command, rover)
  }

  if (command === 'l' || command === 'r') {
    rover.heading = handleTurn(command, rover)
  }
  // console.log(`x: ${rover.coords.x} y: ${rover.coords.y}`) for testing
  return init(rover.coords.x, rover.coords.y, rover.heading)
}

function handleTurn (command, rover) {
  const directions = ['N', 'E', 'S', 'W']
  const numericalCommand = command === 'l' ? -1 : 1
  const currentHeading = directions.indexOf(rover.heading)
  let newHeading = currentHeading + numericalCommand
  if (newHeading < 0) {
    newHeading = 3
  }
  return directions[newHeading]
}

function handleLongitudinalMovement (command, rover) {
  let coords = {
    x: rover.coords.x,
    y: rover.coords.y
  }

  const moveOne = setMove(command, rover.heading)

  switch (rover.heading) {
    case 'N':
      coords.y = moveOne(coords.y)
      break
    case 'E':
      coords.x = moveOne(coords.x)
      break
    case 'S':
      coords.y = moveOne(coords.y)
      break
    case 'W':
      coords.x = moveOne(coords.x)
      break
  }
  return coords
}

function setMove (command, heading) {
  if (heading === 'N' || heading === 'E') {
    return command === 'f' ? plusOne : minusOne
  }

  if (heading === 'S' || heading === 'W') {
    return command === 'f' ? minusOne : plusOne
  }
}

// For simplicity I am assuming a 10x10 fixed grid
function plusOne (coord) {
  if (coord === 10) {
    return 0
  }
  return ++coord
}

function minusOne (coord) {
  if (coord === 0) {
    return 10
  }
  return --coord
}

module.exports = {
  init: init,
  processCommand: processCommand
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

function processCommand (command, rover) {
  if (!command) {
    return rover
  }

  if (command === 'f') {
    rover.coords = handleForward(command, rover)
  }

  if (command === 'l' || command === 'r') {
    rover.heading = handleTurn(command, rover)
  }

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

function handleForward (command, rover) {
  let coords = {
    x: rover.coords.x,
    y: rover.coords.y
  }

  switch (rover.heading) {
    case 'N':
      coords.x += 1
      break
    case 'E':
      coords.y += 1
      break
    case 'S':
      coords.x -= 1
      break
    case 'W':
      coords.y -= 1
      break
  }
  return coords
}

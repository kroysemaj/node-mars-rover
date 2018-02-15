module.exports = {
  init: init,
  processCommand: processCommand
}

function init (x = 0, y = 0, heading = 'N') {
  return {
    x: x,
    y: y,
    heading: heading
  }
}

function processCommand (command, rover) {
  if (!command) {
    return rover
  }
  rover.heading = handleTurn(command, rover)

  return init(rover.x, rover.y, rover.heading)
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

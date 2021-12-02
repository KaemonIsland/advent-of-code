const input = require('./input.json')

// Part 1
const dive = (inputArr) => {
  let horizontal = 0
  let depth = 0

  inputArr.forEach((action) => {
    const [direction, unit] = action.split(' ')

    switch (direction) {
      case 'forward':
        horizontal += Number(unit)
        break
      case 'down':
        depth += Number(unit)
        break
      case 'up':
        depth -= Number(unit)
        break
      default:
        console.log('No Match')
    }
  })

  return horizontal * depth
}

// Part 2
const dive2 = (inputArr) => {
  let horizontal = 0
  let depth = 0
  let aim = 0

  inputArr.forEach((action) => {
    const [direction, unit] = action.split(' ')
    const unitNum = Number(unit)

    switch (direction) {
      case 'forward':
        horizontal += unitNum
        depth += aim * unitNum
        break
      case 'down':
        aim += unitNum
        break
      case 'up':
        aim -= unitNum
        break
      default:
        console.log('No Match')
    }
  })

  return horizontal * depth
}

console.log(dive2(input))

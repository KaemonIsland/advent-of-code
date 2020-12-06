const input = require('./input.json')

const selectRow = (seatCode, minRow, maxRow, minChar, maxChar) => {
  let max = maxRow
  let min = minRow
  let currentRow = null

  seatCode.split('').forEach((code, index) => {
    let mid = Math.floor((min + max) / 2)

    if (code === minChar) {
      max = mid
    } else if (code === maxChar) {
      min = mid + 1
    }

    if (index === seatCode.length - 1) {
      currentRow = code === minChar ? min : max
    }
  })

  return currentRow
}

// console.log(selectRow('FBFBBFFRLR'.slice(0, 8), 0, 127, 'F', 'B'))
// console.log(selectRow('FBFBBFFRLR'.slice(7), 0, 7, 'L', 'R'))

const getMaxBoardingPass = (input) => {
  let max = null

  input.forEach((seatCode) => {
    let row = selectRow(seatCode.slice(0, 8), 0, 127, 'F', 'B')
    let column = selectRow(seatCode.slice(7), 0, 7, 'L', 'R')

    const boardingPassId = row * 8 + column

    if (boardingPassId > max) {
      max = boardingPassId
    }
  })

  return max
}

// console.log(getMaxBoardingPass(input))

const validateOrder = (sortedPass) => {
  let gap = []

  for (let i = 0; i < sortedPass.length - 1; i++) {
    const current = sortedPass[i]

    if (1 + current !== sortedPass[i + 1]) {
      gap.push(sortedPass[i] + 1)
    }
  }

  return gap[0]
}

const findMissingSeat = (input) => {
  const boardingPassIds = []

  input.forEach((seatCode) => {
    let row = selectRow(seatCode.slice(0, 8), 0, 127, 'F', 'B')
    let column = selectRow(seatCode.slice(7), 0, 7, 'L', 'R')

    const boardingPassId = row * 8 + column

    boardingPassIds.push(boardingPassId)
  })

  return validateOrder(boardingPassIds.sort((a, b) => a - b))
}

console.log(findMissingSeat(input))

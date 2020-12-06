const input = require('./input.json')

const testInput = ['abc', 'a\nb\nc', 'ab\nac', 'a\na\na\na', 'b']

const countTotalYes = (inputArr) => {
  let total = 0

  inputArr.forEach((input) => {
    const unique = [...new Set(input.split('\n').join('').split(''))]

    if (unique) {
      total += unique.length
    }
  })

  return total
}

// console.log(countTotalYes(testInput))

const countTotalYes2 = (inputArr) => {
  let total = 0

  inputArr.forEach((input) => {
    const groups = input.split('\n').filter(Boolean)
    console.log(groups)
    const counts = {}

    groups.forEach((group) => {
      group.split('').forEach((char) => {
        if (counts[char]) {
          counts[char] += 1
        } else {
          counts[char] = 1
        }
      })
    })

    Object.values(counts).forEach((val) => {
      if (val === groups.length) {
        total += 1
      }
    })
  })

  return total
}

// console.log(countTotalYes2(input))

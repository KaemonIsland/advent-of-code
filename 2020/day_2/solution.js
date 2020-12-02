const input = require('./input.json')

const testInput = ['2-8 t: pncmjxlvckfbtrjh']

// Part 1 Solution
const countValidPasswords1 = (passArr) => {
  let validCount = 0

  passArr.forEach((password) => {
    // Split password from rules
    const [rule, pass] = password.split(': ')

    // Split rules from character
    const [count, char] = rule.split(' ')

    // Get min and max character counts
    const [min, max] = count.split('-').map(Number)

    // Filter out all chars except the required one
    const charCount = pass.split('').filter((passChar) => passChar === char).length

    if (charCount >= min && charCount <= max) {
      validCount++
    }
  })

  return validCount
}

console.log(countValidPasswords1(input))

// Part 2 Solution
const countValidPasswords2 = (passArr) => {
  let validCount = 0

  passArr.forEach((password) => {
    // Split password from rules
    const [rule, pass] = password.split(': ')

    // Split rules from character
    const [count, char] = rule.split(' ')

    // Get first and second character positions
    const [p1, p2] = count.split('-').map(Number)

    const first = pass[p1 - 1] === char
    const second = pass[p2 - 1] === char

    // Validates that the character only occurs once in the two positions
    if (first === !second) {
      validCount++
    }
  })

  return validCount
}

console.log(countValidPasswords2(input))

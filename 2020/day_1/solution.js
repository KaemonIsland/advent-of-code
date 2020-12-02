const input = require('./input.json')

// Part 1
const findTwoSum = (inputArr, total) => {
  // Track possible sums to create total.
  // Key: value not yet found
  // Value: Value we have
  const sums = {}
  let solution = null

  // Iterate through all nums adding them to the sums object
  // If a match is found we set the solution and return false to exit
  inputArr.every((num) => {
    const remainder = total - num

    if (sums[num]) {
      solution = num * sums[num]
      return false
    }

    sums[remainder] = num
    return true
  })

  return solution
}

console.log(findTwoSum(input, 2020))

// Basically a wrapper for findTwoSum
// We already know how to locate a sum of two nums that equal a total
// So now we just need to select one num, subtract from the total, and
// let that be the new total for findTwoSum
const findThreeSum = (inputArr, total) => {
  let solution = null

  inputArr.every((num) => {
    const newTotal = total - num
    // Remove duplicates
    const filteredInput = inputArr.filter((numInput) => numInput !== num)

    const answer = findTwoSum(filteredInput, newTotal)

    if (answer) {
      solution = answer * num
      return false
    }
    return true
  })

  return solution
}

console.log(findThreeSum(input, 2020))

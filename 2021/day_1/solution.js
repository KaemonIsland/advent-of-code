const input = require('./input.json')

const countDepthIncrease = (depthArr) => {
  let depthInc = 0

  let prevDepth = null

  depthArr.forEach((depth) => {
    if (prevDepth !== null && depth > prevDepth) {
      depthInc += 1
    }

    prevDepth = depth
  })

  return depthInc
}

// console.log(countDepthIncrease(input))

const createThreeSum = (depthArr) => {
  const numGroups = []
  let currentLength = 0

  depthArr.forEach((depth) => {
    ;[currentLength, currentLength + 1, currentLength + 2].forEach((location) => {
      if (!numGroups[location]) {
        numGroups[location] = [depth]
      } else {
        numGroups[location].push(depth)
      }
    })

    currentLength += 1
  })

  const groupsOfThree = numGroups.filter((group) => group.length === 3)

  const finalArr = groupsOfThree.map((group) => group.reduce((a, b) => a + b))

  return finalArr
}

console.log(countDepthIncrease(createThreeSum(input)))

const input = require('./input.json')

const countDigits = (input) => {
  const counts = {}

  input.forEach((bin) => {
    bin.split('').forEach((num, i) => {
      if (counts[i] === undefined) {
        counts[i] = {
          0: 0,
          1: 0,
        }
      }

      if (num === '0') {
        counts[i]['0'] += 1
      } else {
        counts[i]['1'] += 1
      }
    })
  })

  return counts
}

const getPowerConsumption = (counts) => {
  let gammaRate = ''
  let epsilonRate = ''

  Object.values(counts).forEach((count) => {
    if (count['0'] > count['1']) {
      gammaRate += '0'
      epsilonRate += '1'
    } else {
      gammaRate += '1'
      epsilonRate += '0'
    }
  })

  return {
    gammaRate,
    gammaParsed: parseInt(gammaRate, 2),
    epsilonRate,
    epsilonParsed: parseInt(epsilonRate, 2),
    powerConsumption: parseInt(gammaRate, 2) * parseInt(epsilonRate, 2),
  }
}

const counts = countDigits(input)

const powerConsumption = getPowerConsumption(counts)

// Part 2

const countDigitsAtPosition = (input, position) => {
  const counts = {
    0: 0,
    1: 0,
  }

  input.forEach((bin) => {
    if (bin[position] === '0') {
      counts[0] += 1
    } else {
      counts[1] += 1
    }
  })

  return counts
}

const getOxygenRating = (input) => {
  let position = 0
  let remaining = input

  while (position < input[0].length && remaining.length > 1) {
    const counts = countDigitsAtPosition(remaining, position)

    if (counts[1] >= counts[0]) {
      remaining = remaining.filter((bin) => bin[position] === '1')
    } else {
      remaining = remaining.filter((bin) => bin[position] === '0')
    }

    position += 1
  }

  return parseInt(remaining[0], 2)
}

const getCO2Rating = (input) => {
  let position = 0
  let remaining = input

  while (position < input[0].length && remaining.length > 1) {
    const counts = countDigitsAtPosition(remaining, position)

    if (counts[0] <= counts[1]) {
      remaining = remaining.filter((bin) => bin[position] === '0')
    } else {
      remaining = remaining.filter((bin) => bin[position] === '1')
    }

    position += 1
  }

  return parseInt(remaining[0], 2)
}

const oxygen = getOxygenRating(input)
const co2 = getCO2Rating(input)

console.log({ oxygen, co2, answer: oxygen * co2 })

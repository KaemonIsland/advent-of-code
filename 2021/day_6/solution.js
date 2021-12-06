const input = require('./input.json')

// const trackFishPopulation = (input, days) => {
//   let currentPop = input
//   let currentDay = 0

//   while (currentDay < days) {
//     let newFish = 0
//     currentPop = currentPop.map((fish) => {
//       if (fish === 0) {
//         newFish++
//         return 6
//       } else {
//         return fish - 1
//       }
//     })

//     for (let i = 0; i < newFish; i++) {
//       currentPop.push(8)
//     }

//     currentDay++
//   }

//   return currentPop.length
// }

const trackFishPopulation = (input, days) => {
  let currentPop = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  }
  let currentDay = 0

  // Counts initial fish pop
  input.forEach((fish) => {
    currentPop[fish] += 1
  })

  while (currentDay < days) {
    let newPop = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
    }

    Object.entries(currentPop).forEach(([daysLeft, pop]) => {
      const daysNum = Number(daysLeft)

      if (daysNum === 0) {
        newPop[8] += pop
        newPop[6] += pop
      } else {
        newPop[daysNum - 1] += pop
      }
    })

    currentPop = { ...newPop }

    currentDay++
  }

  return Object.values(currentPop).reduce((a, b) => a + b)
}

console.log(trackFishPopulation(input, 256))

const input = require('./input.json')

const example = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#',
]

const countTrees = (slope, right = 3, down = 1) => {
  const lineLength = slope[0].length - 1
  let row = 0
  let column = 0
  let trees = 0

  while (row < slope.length - 1) {
    // move right 3
    column += right

    // move down 1
    row += down

    if (column > lineLength) {
      column = column - lineLength - 1
    }

    console.log(row, slope[row], column, slope[row][column])
    console.log()
    // Check the current spot for a tree
    if (slope[row][column] === '#') {
      trees++
    }
  }

  return trees
}

console.log(countTrees(input)) // 282

const countMultipleTrees = () => {
  const one = countTrees(input, 1, 1)
  const two = countTrees(input, 3, 1)
  const three = countTrees(input, 5, 1)
  const four = countTrees(input, 7, 1)
  const five = countTrees(input, 1, 2)

  return one * two * three * four * five
}

console.log(countMultipleTrees()) // 958815792

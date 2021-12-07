const { pull, boards } = require('./input.json')

const checkRows = (board) => board.some((row) => row.every(({ marked }) => marked))

const checkColumns = (board) => {
  const columns = []

  for (let i = 0; i < 5; i++) {
    const column = []
    for (let j = 0; j < 5; j++) {
      column.push(board[j][i])
    }
    columns.push(column)
  }

  return checkRows(columns)
}

const buildBoard = (rawBoard) =>
  rawBoard.map((row) =>
    row
      .split(' ')
      .filter(Boolean)
      .map((num) => ({
        value: Number(num),
        marked: false,
      })),
  )

const printBoard = (board) => {
  board.forEach((row) => {
    let rowStr = []
    row.forEach((num) => {
      let numStr = null

      if (num.value < 10) {
        numStr = ` ${num.value}`
      } else {
        numStr = `${num.value}`
      }

      if (num && num.marked) {
        rowStr.push(`[${numStr}]`)
      } else {
        rowStr.push(` ${numStr} `)
      }
    })
    console.log(rowStr.join(' '))
  })
}

const markNum = (board, num) =>
  board.map((row) =>
    row.map(({ value, marked }) => ({ value, marked: marked || (!marked && value === num) })),
  )

const calcBoardScore = (board, winningNum) => {
  // Sum all unmarked numbers
  // Multiply the sum by the winning number
  const winningNumbers = []

  board.forEach((row) =>
    row.forEach(({ value, marked }) => {
      if (!marked) {
        winningNumbers.push(value)
      }
    }),
  )

  return winningNumbers.reduce((a, b) => a + b) * winningNum
}

const playBingo = (boards, pull) => {
  let winner = false
  let winningNum = null
  let currentPull = 0
  let formattedBoards = boards.map(buildBoard)

  while (!winner) {
    // Mark any numbers that belong to a board
    formattedBoards = formattedBoards.map((board) => markNum(board, pull[currentPull]))

    // Check for a winning board
    formattedBoards.forEach((board) => {
      if (checkRows(board) || checkColumns(board)) {
        winner = board
        winningNum = pull[currentPull]
      }
    })

    if (winner) {
      console.log(`The winning pull is ${pull[currentPull]}`)
      console.log(`The winning board is: `)
      printBoard(winner)
    }

    // Update pull number
    currentPull++
  }

  console.log(calcBoardScore(winner, winningNum))

  return calcBoardScore(winner, winningNum)
}

const playLosingBingo = (boards, pull) => {
  let winningBoard = null
  let winningPull = null
  let currentPull = 0
  let remainingBoards = boards.map(buildBoard)

  while (!winningBoard && remainingBoards.length) {
    // Mark any numbers that belong to a board
    let markedBoards = remainingBoards.map((board) => markNum(board, pull[currentPull]))

    // Check for a winning board
    if (
      markedBoards.length === 1 &&
      (checkRows(markedBoards[0]) || checkColumns(markedBoards[0]))
    ) {
      winningBoard = markedBoards[0]
      winningPull = pull[currentPull]
      remainingBoards = []
    } else {
      remainingBoards = markedBoards.filter((board) => !checkRows(board) && !checkColumns(board))
    }

    // Update pull number
    currentPull++
  }

  printBoard(winningBoard)
  console.log(calcBoardScore(winningBoard, winningPull))

  return calcBoardScore(winningBoard, winningPull)
}

// playLosingBingo(
//   [
//     ['22 13 17 11  0', ' 8  2 23  4 24', '21  9 14 16  7', ' 6 10  3 18  5', ' 1 12 20 15 19'],
//     [' 3 15  0  2 22', ' 9 18 13 17  5', '19  8  7 25 23', '20 11 10 24  4', '14 21 16 12  6'],
//     ['14 21 17 24  4', '10 16 15  9 19', '18  8 23 26 20', '22 11 13  6  5', ' 2  0 12  3  7'],
//   ],
//   [
//     7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26,
//     1,
//   ],
// )

playLosingBingo(boards, pull)

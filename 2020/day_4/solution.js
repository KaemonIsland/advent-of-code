const input = require('./input.json')

const validatePassports = (passports) => {
  let valid = 0
  const validFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  passports.forEach((passport) => {
    const passObj = {}

    passport.split(' ').forEach((keyValue) => {
      const [key, value] = keyValue.split(':')
      passObj[key] = value
    })

    const allRequired = validFields.every((field) => passObj[field])

    if (allRequired) {
      valid++
    }
  })

  return valid
}

console.log(validatePassports(input))

const isValidNum = (num, min, max) => Number(num) >= min && Number(num) <= max

const isValidHeight = (height) => {
  const num = Number(height.slice(0, -2))
  if (height.includes('cm')) {
    return isValidNum(num, 150, 193)
  } else if (height.includes('in')) {
    return isValidNum(num, 59, 76)
  }
  return false
}

const isValidHairColor = (hairColor) =>
  hairColor[0] === '#' &&
  hairColor.length === 7 &&
  hairColor
    .substr(1)
    .split('')
    .every((char) => /[0-9a-f]/g.test(char))

const isValidEyeColor = (eyeColor) =>
  ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some((color) => color === eyeColor)

const isValidPassportId = (passportId) =>
  passportId.length === 9 && passportId.split('').every((char) => /[0-9]/g.test(char))

const convertStrToObj = (stringArr) =>
  stringArr.map((string) => {
    const obj = {}

    string.split(' ').map((keyValue) => {
      const [key, value] = keyValue.split(':')
      obj[key] = value
    })

    return obj
  })

const getValidPassports = (passports) => {
  const validFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  // Filter out passports without valid fields
  return (
    passports
      .filter((passport) => validFields.every((field) => passport[field]))

      // Filter out accurate birth years
      .filter((passport) => isValidNum(passport.byr, 1920, 2002))
      .filter((passport) => isValidNum(passport.iyr, 2010, 2020))
      .filter((passport) => isValidNum(passport.eyr, 2020, 2030))

      // Validates Height
      .filter((passport) => isValidHeight(passport.hgt))
      .filter((passport) => isValidHairColor(passport.hcl))
      .filter((passport) => isValidEyeColor(passport.ecl))

      .filter((passport) => isValidPassportId(passport.pid))
  )
}

const passportObj = convertStrToObj(input)

const hasAllFields = getValidPassports(passportObj)
console.log(hasAllFields.length)

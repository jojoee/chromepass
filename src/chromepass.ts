const {
  lowercase,
  uppercase,
  number,
  specialCharacter,
} = require('./common').possibleSpace
const passwordLength = 15

/**
 * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param arr string[]
 */
function shuffle(arr: string[]) {
  let items = [...arr] // clone

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items
}

/**
 * todo test
 *
 * @param min integer
 * @param max integer
 */
function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generator(): string {
  // contains at least
  // - 1 lowercase
  // - 1 uppercase
  // - 1 number
  // - 1 special chracter
  let password = ''
  password += lowercase[randomBetween(0, lowercase.length - 1)]
  password += uppercase[randomBetween(0, uppercase.length - 1)]
  password += number[randomBetween(0, number.length - 1)]
  password += specialCharacter[randomBetween(0, specialCharacter.length - 1)]

  // generate the rest
  const possibleStr = ''.concat(lowercase, uppercase, number, specialCharacter)
  const nRemainingChars = passwordLength - password.length
  for (let i = 0; i < nRemainingChars; i++) {
    password += possibleStr[randomBetween(0, possibleStr.length - 1)]
  }

  // shuffle when it contains '--' and '__'
  let nRemainingAttempts = 5
  do {
    const chars = password.split('')
    const shuffledChars = shuffle(chars)
    password = shuffledChars.join('')
  } while ((password.includes('--') || password.includes('__')) && nRemainingAttempts-- > 0)

  return password
}

export default {
  v1: {
    generator
  }
}

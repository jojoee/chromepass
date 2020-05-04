import { possibleSpace } from './common'
import shuffle from 'fast-shuffle'
const {
  lowercase,
  uppercase,
  number,
  specialCharacter,
} = possibleSpace
const passwordLength = 15

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

  // shuffle is it contains '--' and '__'
  let nRemainingAttempts = 5
  do {
    password = shuffle(password.split('')).join('')
  } while ((password.includes('--') || password.includes('__')) && nRemainingAttempts-- > 0)

  return password
}

export default {
  v1: {
    generator
  }
}

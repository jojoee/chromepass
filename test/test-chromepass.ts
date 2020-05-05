import test from 'ava'
import chromepass from '../src/chromepass'
import { possibleSpace } from '../src/common.js'
const generator = chromepass.v1.generator

// generate test data
const n = 100
const passwords: string[] = []
for (let i = 0; i < n; i++) {
  const password: string = generator()
  passwords.push(password)
}

test('password length must be equals 15', t => {
  for (const password of passwords) {
    t.is(password.length, 15)
  }
})

test('password char must be taken from the list', t => {
  const possibleStr = possibleSpace.lowercase + possibleSpace.uppercase + possibleSpace.number + possibleSpace.specialCharacter

  for (const password of passwords) {
    for (const char of password) {
      t.true(possibleStr.includes(char))
    }
  }
})

// contains at least
// - 1 lowercase
// - 1 uppercase
// - 1 number
// - 1 special chracter
test('password must contains at least 1 lowercase, 1 uppercase, 1 number, 1 special character', t => {
  let isLowercaseExists = false
  let isUppercaseExists = false
  let isNumberExists = false
  let isSpecialCharacterExists = false

  // todo optimize time complexity
  for (const password of passwords) {
    for (const char of password) {
      if (possibleSpace.lowercase.includes(char)) {
        isLowercaseExists = true
      } else if (possibleSpace.uppercase.includes(char)) {
        isUppercaseExists = true
      } else if (possibleSpace.number.includes(char)) {
        isNumberExists = true
      } else if (possibleSpace.specialCharacter.includes(char)) {
        isSpecialCharacterExists = true
      }
    }

    t.true(isLowercaseExists && isUppercaseExists && isNumberExists && isSpecialCharacterExists)
  }
})

test.todo('password have small chance to contain "__" and "--"')

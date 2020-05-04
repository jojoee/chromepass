const number = '23456789'
const lowercase = 'abcdefghijkmnpqrstuvwxyz'
const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
const specialCharacter = '*!-@%#.$_&'
const possibleSpace = {
  number,
  lowercase,
  uppercase,
  specialCharacter,

  numberLengths: number.length,
  lowercaseLengths: lowercase.length,
  uppercaseLengths: uppercase.length,
  specialCharacterLengths: specialCharacter.length,
}

module.exports = {
  possibleSpace
}

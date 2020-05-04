const { table } = require('table') // eslint-disable-line @typescript-eslint/no-var-requires
const sd = require('math-standard-deviation') // eslint-disable-line @typescript-eslint/no-var-requires
const { possibleSpace } = require('./src/common') // eslint-disable-line @typescript-eslint/no-var-requires
const passwords = [
  '3dq*rT!7R-Ud5Pi',
  'p!w@%d9sCeRpsn6',
  'L7!Vt4NymLr#Z#!',
  '@p.Jvj2PpMvVX.$',
  '9p_d&$mJfcs8bSY',
  'APp9nCuE#tc3An_',
  'pq-Aq&Wk2H@B!LL',
  '*%8nsLD4r47biC8',
  'es!LNSH%7wZ4b9B',
  '&AG8_7RCR7Rk$pg',
  'aay!L%3v2dSmn&F',
  'EgqDEyde&E@x6sy',
  'q9r@HySPYe$S3t#',
  '$YJG-VAYm7*8E!H',
  'TdHVT8NW.k!erdT',
  'Va*HHNFi7Z%!8&D',
  'QfvmL%nwVm5n*L8',
  'u6g#ZnNM_4#7Sn6',
  '3@&b9sk5P$mjbN#',
  'u3w!ruD&ZEJEKP9',
  'U6z7$EMMV!KH_@C',
  'uC8.TwXKAnhTK43',
  '6tercHJimDj2&&h',
  'JH6kn.EMrdDSqY$',
  'C7i4-E*RWnwEwaC',
  '4jsgC7!a.KX82r*',
  'd2Mepf6%Q!Cz@Zj',
  '2GF!22XnqG%VmWX',
  '4*&L3nW$9M96Ky_',
  'GVFF@ahaHf3L&2D',
  'x8aw$.8@UN@&pRq',
  'LUdUKT2xZ-SJjb&',
  'RUru%8i-DUBqN8X',
  '6@7N3zm.R4jQg#.',
  '9D.A7FkrMwd#L-&',
  'QxJNTiN3!z$HM5e',
  '7i&VB4djWK@rW!6',
  'V*z55&HG3cXZ%jw',
  'wN&_fsm%Yx2KRH5',
  '89gE4gGA2gZU3t-',
  'MPQ_Cq*g2BsPapB',
  '.re4jBpeY8.CW4!',
  'f$4rQmgf8KS*c$s',
  'bWEXvdJQ4wgP9d&',
  '*fhN5tqn%T8usuE',
  '%GPwghTbdGfx4jF',
  'Rq5b3#VhsqKBLwB',
  'XfjTntDbgEhP%8-',
  'jqbKxtb5%eB3KwV',
]

class Stat {
  constructor(param = {}) {
    const defaultParam = {
      numbers: [],
      lowercases: [],
      uppercases: [],
      specialCharacters: []
    }
    param = Object.assign({}, defaultParam, param)

    /** @type {Array.number} */
    this.numbers = param.numbers
    /** @type {Array.string} */
    this.lowercases = param.lowercases
    /** @type {Array.string} */
    this.uppercases = param.uppercases
    /** @type {Array.string} */
    this.specialCharacters = param.specialCharacters
  }
}

console.log(`processing ${passwords.length} passwords`)
/** @type {Array.Stat} the variable use a lot of space */
const stats = []
// in array
for (const password of passwords) {
  const stat = new Stat()

  // in string
  for (let j = 0; j < password.length; j++) {
    const str = password[j]
    const code = password.charCodeAt(j)

    if (code > 47 && code < 58) { // numeric (0-9)
      stat.numbers.push(str)
    } else if (code > 64 && code < 91) { // upper alpha (A-Z)
      stat.uppercases.push(str)
    } else if (code > 96 && code < 123) { // lower alpha (a-z))
      stat.lowercases.push(str)
    } else if ('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.includes(str)) {
      // https://owasp.org/www-community/password-special-characters
      stat.specialCharacters.push(str)
    } else {
      console.log('---- something went wrong', str, code)
    }
  }

  stats.push(stat)
}

// stat of number of each
console.log('stat of number of each')
let statSize = {
  numberLengths: [],
  lowercaseLengths: [],
  uppercaseLengths: [],
  specialCharacterLengths: [],
}
for (const stat of stats) {
  statSize.numberLengths.push(stat.numbers.length)
  statSize.lowercaseLengths.push(stat.lowercases.length)
  statSize.uppercaseLengths.push(stat.uppercases.length)
  statSize.specialCharacterLengths.push(stat.specialCharacters.length)
}
let data = [['key', 'mean', 'std', '%']]
for (const [key, items] of Object.entries(statSize)) {
  const mean = sd.mean(items)
  const percent = mean / possibleSpace[key] * 100
  const std = sd.standardDeviation(items)
  data.push([key, mean, std, percent])
}
console.log(table(data, {}))

// unique special character
console.log('unique special character')
let specialCharacters = []
for (const stat of stats) {
  specialCharacters = specialCharacters.concat(stat.specialCharacters)
}
const uniqueSpecialCharacters = [...new Set(specialCharacters)]
console.log('uniqueSpecialCharacters', uniqueSpecialCharacters)

# chromepass
[![npm version](https://img.shields.io/npm/v/chromepass.svg)](https://npmjs.org/package/chromepass)
[![codecov](https://codecov.io/gh/jojoee/chromepass/branch/master/graph/badge.svg)](https://codecov.io/gh/jojoee/chromepass)
![License](https://img.shields.io/npm/l/chromepass)
[![Dependency Status](https://david-dm.org/jojoee/chromepass.svg)](https://david-dm.org/jojoee/chromepass)
[![devDependency status](https://img.shields.io/david/dev/jojoee/chromepass.svg)](https://david-dm.org/jojoee/chromepass#info=devDependencies)
[![downloads](https://img.shields.io/npm/dt/chromepass.svg)](https://npmjs.org/package/chromepass)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

![continuous integration](https://github.com/jojoee/chromepass/workflows/continuous%20integration/badge.svg?branch=master)
![release](https://github.com/jojoee/chromepass/workflows/release/badge.svg?branch=master)

Google Chrome password generator algorithm.

## Install

```shell
npm install chromepass
// or
npm install git+ssh://git@github.com/jojoee/chromepass
// or run globally
npm install -g chromepass
chromepass
chromepass 10
```

## Example usage

```typescript
// commonjs
const { generator } = require('chromepass').default.v1
for (let i = 0; i < 10; i++) {
  const password = generator()
  console.log(password)
}

// ES6
import chromepass from "chromepass"
const generator = chromepass.v1.generator
for (let i = 0; i < 10; i++) {
  const password = generator()
  console.log(password)
}
```

## Algorithm
Algorithm is described in [password_generator.cc](https://github.com/chromium/chromium/blob/master/components/password_manager/core/browser/generation/password_generator.cc).

1. Define a set of character which contains 4 classes
    - lowercase
    - uppercase
    - number
    - special character

2. Remove characters due to visual similarity
    - `l` (lowercase L)
    - `I` (capital i)
    - `1` (one)
    - `O` (capital o)
    - `0` (zero)
    - `o` (lowercase O)

    So, we will got all possible characters in each class
    - lowercase: `abcdefghijkmnpqrstuvwxyz`
    - uppercase: `ABCDEFGHJKLMNPQRSTUVWXYZ`
    - number: `23456789`
    - special character: `*!-@%#.$_&` (without ambiguous characters e.g. `{}[]()/\'":;`)

3. Generate

    3.1 Random minimum character of each class
        - lowercase: 1 character
        - uppercase: 1 character
        - number: 1 character
        - special character: 1 character

    3.2 Random the rest evenly, until met 15 character length

4. Shuffle up to 5 if found `--` and `__` in a generated password to improve readability

## Reference
- [How do I decide whether @types/* goes into `dependencies` or `devDependencies`?](https://stackoverflow.com/questions/45176661/how-do-i-decide-whether-types-goes-into-dependencies-or-devdependencies)
- [Chrome generated passwords not high entropy?](https://security.stackexchange.com/questions/190796/chrome-generated-passwords-not-high-entropy)
- [Secure Password Generator](https://passwordsgenerator.net/)

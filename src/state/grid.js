
// Direction, Increment, Length
let d = null
let l = 1

const isEven = n => n % 2 === 0
const isOdd = n => Math.abs(n % 2) === 1

const getLength = (n, l) => n % 2 === 0 ? n / 2 : l

const right = n => (isEven(n) && isOdd(n / 2) && 'r') || false
const up = n => (isOdd(n) && !!right(n - 1) && 'u') || false
const left = n => (isEven(n) && isEven(n / 2) && 'l') || false
const down = n => (isOdd(n) && !!left(n - 1) && 'd') || false

const direction = n => [right(n), up(n), left(n), down(n)].reduce((direction, current) => current || direction, null)

// @TODO Upper limit on increment based on total cumulative volume of grid compared to viewport.
// While v(grid) < v(viewportArea) in place of 100 effecitively.
for (let i = 1; i <= 100; i++) {
  d = direction(i)
  l = getLength(i, l)
  console.log('Increment', i, 'Direction', d, 'Length', l)
}

export const grid = 'File Imported'

const readline = require('readline');
const _ = require('underscore');
const R = require('ramda');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const strToArray = function(str) {
  return _.compact(_.map( str.split(' '), (val) => {
    return parseInt(val)
  }))
}

var input = []
var result = []

function promisiFunction(n, m) {
  return new Promise( (resolve) => {
    setTimeout( ()=> {
      result[n][m] = input[m][n]
      console.log('im here')
      resolve(input[m][n])
    }, 0)
  })
}

const doIt = (n) => {
  var promises = []
  for(var x = 0; x < n; x++) {
    result[x] = []
    for(var y = 0; y < n; y++) {
      promises.push( promisiFunction(x, y))
    }
  }
  console.log(promises) // здесь мы видим что все промисы имеют статус "в ожидании"
  Promise.all(promises).then((res) => {
    console.log(promises, res) // здесь все промисы и массив того, что вернулось через resolve
    console.log(result)
    rl.close()
  })
}

const readLine = (line, index, n) => {
  if (line.length == n ){
    input[index] = line
    return line
  } else {
    return null
  }

}

console.log("\n+++++++ TASK #3 +++++++\n")

const q1 = rl.question('Enter n: ', (n) => {
  console.log("Enter matrix nxn")

  var correctLines = 0
  rl.on('line', (line) => {
    if (readLine(strToArray(line), correctLines, n)) correctLines++
    if (correctLines == n) {
      console.log('input accepted')
      doIt(n)
    }
  })
})
const readline = require('readline');
const _ = require('underscore');
const R = require('ramda');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const strToArray = function(str) {
  return _.map( str.split(' '), (val) => {
    return parseInt(val)
  })
}

var input1 = []
var input2 = []
var result = []

function promisiFunction(n, m, size) {
  return new Promise( (resolve) => {
    setTimeout( ()=> {
      var sum = 0
      for(var i = 0; i < size; i++){
        sum += input1[n][i] * input2[i][m]
      }
      result[n][m] = sum
      resolve(sum)
    }, 0)
  })
}

const doIt = (n) => {
  var promises = []
  for(var x = 0; x < n; x++) {
    result[x] = []
    for(var y = 0; y < n; y++) {
      promises.push( promisiFunction(x, y, n))
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
    if (index < n ) {
      input1[index] = line
    } else {
      input2[index - n] = line
    }
    return line
  } else {
    return null
  }
}

console.log("\n+++++++ TASK #4 +++++++\n")

const q1 = rl.question('Enter n: ', (n) => {
  console.log("Enter first matrix " + n + "x" + n)

  var correctLines = 0
  rl.on('line', (line) => {
    if (readLine(strToArray(line), correctLines, n)) correctLines++
    if (correctLines == n) console.log('Enter second matrix')
    if (correctLines == n * 2) {
      console.log('input accepted')
      doIt(n)
    }
  })
})


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

const doIt = (vector) => {

  var max = -Infinity

  if (vector.length > 0 ){
    Promise.all(_.map(_.range(0, vector.length), (val) => {
      if (max < vector[val]) {
        max = vector[val]
        return max
      }
    }))
    .then((results) => {
      console.log('answer:', max)
      rl.close()
    })
  }
  else {
    console.log("bad input")
  }

}

console.log("\n+++++++ TASK #2 +++++++\n")

const q1 = rl.question('Enter vector (e.g. "3 4 5"): ', (answer) => {
  doIt(strToArray(answer))
});


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

const parallelFunction = (coord1, coord2) => {
  return coord1 * coord2
}

const doIt = (vec1, vec2) => {

  if (vec1.length == vec2.length && vec1.length > 0 ){
    Promise.all(_.map(_.range(0, vec1.length), (val) => {
      return new Promise((resolve, reject) => {
          setTimeout( ()=> {
            console.log('im here promise #', val)
            resolve(parallelFunction( vec1[val], vec2[val]))
          }
          , 0) // Можно поэксперементировать с таймаутом, чтобы увидеть что функции выполняются параллельно
        }
      )
    }))
    .then((res) => {
      console.log('answer:', res)
      rl.close()
    })
  }
  else {
    return "bad input"
  }

}

console.log("\n+++++++ TASK #1 +++++++\n")

const q1 = rl.question('Enter first vector (e.g. "3 4 5"): ', (answer1) => {
  const q2 = rl.question('Enter second vector: ', (answer2) => {
    doIt(strToArray(answer1), strToArray(answer2))
      
  })
});


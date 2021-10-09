/** Get a random number between a min and max */
function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandChoice(arr) {
    const ind = getRand(0, arr.length - 1)
    return arr[ind];
}
  
  
module.exports = {getRand, getRandChoice};
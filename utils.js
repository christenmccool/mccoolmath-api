/** Get a random number between a min and max */
function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandChoice(arr) {
    const ind = getRand(0, arr.length - 1)
    return arr[ind];
}
  
function ensureOneNeg(arr) {
    const nums = [...arr];
    const negNums = nums.filter(ele => ele < 0);
    if (negNums.length === 0) {
        const ind = getRand(0, nums.length - 1);
        nums[ind] = nums[ind] * -1;
    }
    return nums;
}

function getNRandInts(n, min, max, requireNeg, limitZero=false) {
    if (min > max) {
        throw new Error('Minimum value must be greater than maximum value');
    }
    if (min >= 0 && requireNeg === true) {
        throw new Error('Minimum value must be less than zero to require a negative value');
    }
    if (n < 0) {
        throw new Error('n cannot be negative');
    }

    let nums = [];
    for (let i = 0; i < n; i++) {
        let next = getRand(min, max);
        if (limitZero) {
            while (next === 0 || next === -0) {
                next = getRand(min, max);
            }
        }
        nums.push(next);
    }

    if (requireNeg) {
        nums = ensureOneNeg(nums);
    }
    return nums;
}
  
function getSum(arr) {
    return arr.reduce((accum, next) => accum + next)
}

function getDiff(arr) {
    return arr.reduce((accum, next) => accum - next)
}

function getProd(arr) {
    return arr.reduce((accum, next) => accum * next)
}

function getQuot(arr) {
    return arr.reduce((accum, next) => accum / next)
}


function intExpConcat(nums, sym, withParens=true) {
    return nums.reduce((accum, ele, i) => {
        const next = (withParens && i>0 && ele < 0) ? `(${ele})` : ele;
        return accum + `${sym}${next}`;
    })
}

module.exports = {getRand, getRandChoice, ensureOneNeg, getNRandInts, getSum, getDiff, getProd, getQuot, intExpConcat};
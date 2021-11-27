/** Get a random number between a min and max */
function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandNeg(min) {
    return Math.floor(Math.random() * (-1 - min + 1)) + min
}

function getRandChoice(arr) {
    const ind = getRand(0, arr.length - 1)
    return arr[ind];
}
  
function ensureOneNeg(arr, min=-10) {
    const nums = [...arr];
    const negNums = nums.filter(ele => ele < 0);
    if (negNums.length === 0) {
        const ind = getRand(0, nums.length - 1);
        nums[ind] = nums[ind] ? nums[ind] * -1 : getRandNeg(min);
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
        nums = ensureOneNeg(nums, min);
    }
    return nums;
}
  
module.exports = {getRand, getRandChoice, ensureOneNeg, getNRandInts};
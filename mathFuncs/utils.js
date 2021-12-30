/** Get a random number between a min and max. */
function getRand(min, max, allowZero=false) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    while (!allowZero && num === 0) {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return num;
}

/** Get a random number between a min and 0 (min is a negative integer). */
function getRandNeg(min) {
    return Math.floor(Math.random() * (-1 * min)) + min
}

/** Make a random selection from an array of options. */
function getRandChoice(arr) {
    const ind = getRand(0, arr.length - 1)
    return arr[ind];
}
  
/** Given an array of integers, ensure that at least one element is negative. 
 * 
 * Returns a new array with at least negative element
*/
function ensureOneNeg(arr, min=-10) {
    const nums = [...arr];
    const negNums = nums.filter(ele => ele < 0);
    if (negNums.length === 0) {
        const ind = getRand(0, nums.length - 1);
        nums[ind] = getRandNeg(min);
    }
    return nums;
}

/** Returns an array of n random integers. */
function getNRandInts(n, min, max, requireNeg=false, allowZero=false) {
    if(Number.isNaN(min) || Number.isNaN(max)) {
        throw new Error('Minimum and maximum values must be integers');
    }

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
        nums.push(getRand(min, max, allowZero));
    }

    if (requireNeg) {
        nums = ensureOneNeg(nums, min);
    }
    return nums;
}

/** Returns an array of the factors of num. */
function findFactors(num) {
    let factors = [1, Math.abs(num)];
    for (let i=2; i <= Math.abs(num)/2; i++) {
        if (num%i === 0) factors.push(i);
    }
    return factors;
}

/** Returns the latex for an expression built from an array of numbers and an array of operations. */
function getLatex(nums, ops, showAsFrac=false) {
    const symbols = {
        "add": "+",
        "sub": "-",
        "mult": "\\cdot",
        "div": "\\div",
        "exp": "^"
    }

    let latex = "";
    for (let i = 0; i < nums.length; i++) {
        if (showAsFrac && ops[i] === "div") {
            latex += "\\frac"
        }
        
        let nextTerm = nums[i];
        if (i>0 && nums[i] < 0 && (ops[i-1] === "add" || ops[i-1] === "sub") ) {
            nextTerm = `(${nums[i]})`;
        }
        if (nums[i] < 0 && ops[i] === "exp") {
            nextTerm = `(${nums[i]})`;
        }
        if (ops[i-1] === "exp") {
            nextTerm = `{${nums[i]}}`;
        }
        if ((ops[i-1] === "div" || ops[i] === "div") && showAsFrac) {
            nextTerm = `{${nums[i]}}`;
        }

        latex += nextTerm;

        if (i < nums.length - 1) {
            if (showAsFrac && ops[i] === "div") {
                latex += "";
            } else {
                latex += symbols[ops[i]];
            }
        }
    }
    return latex;
}

/** Evaluates an expression built from an array of numbers and an array of operations. 
 * 
 * if includeWork: returns {value, work} where work is an array of work
 * if flagNeg: returns {value, negDiff} 
 *      negDiff is a boolean indicating whether a negative difference occurs during evaluation
 * 
*/
function evaluate(nums, ops, includeWork= false, flagNeg=false) {
    let remainingNums = [...nums];
    let remainingOps = [...ops];
    let work = [];

    //Evaluate exponents first
    let ind = remainingOps.indexOf("exp");
    while (ind !== -1) {
        remainingNums.splice(ind, 2, remainingNums[ind]**remainingNums[ind+1])
        remainingOps.splice(ind, 1);
        ind = remainingOps.indexOf("exp");
        if (includeWork) work.push(getLatex(remainingNums, remainingOps));
    }

    //Evaluate multiplication and division from left to right
    ind = remainingOps.findIndex(ele => ele === "mult" || ele === "div");
    while (ind !== -1) {
        let nextVal = remainingOps[ind] === "mult" ? remainingNums[ind] * remainingNums[ind+1] 
            : remainingNums[ind] / remainingNums[ind+1];
        remainingNums.splice(ind, 2, nextVal)
        remainingOps.splice(ind, 1);
        ind = remainingOps.findIndex(ele => ele === "mult" || ele === "div");
        if (includeWork) work.push(getLatex(remainingNums, remainingOps));
    }

    let negDiff = false;
    //Evaluate addition and subtraction from left to right
    while (remainingOps.length > 0) {
        let nextVal = remainingOps[0] === "add" ? remainingNums[0] + remainingNums[0+1] 
            : remainingNums[0] - remainingNums[1];
        
        //Flag that a negative difference occurs during evaluation
        if (remainingOps[0] === "sub" && remainingNums[0] - remainingNums[1] < 0) {
            negDiff = true;
        }

        remainingNums.splice(0, 2, nextVal)
        remainingOps.splice(0, 1);
        if (includeWork) work.push(getLatex(remainingNums, remainingOps));
    }

    if (!includeWork && !flagNeg) return remainingNums[0];
    if (!includeWork) return {value: remainingNums[0], negDiff};
    if (!flagNeg) return {value: remainingNums[0], work: work.slice(0,-1)};
    return {value: remainingNums[0], work: work.slice(0,-1), negDiff};
}


/** Adjust numbers that will be exponents to be between minExp and maxExp. */
function adjustExponents(nums, ops, minExp, maxExp) {
    const newNums = [...nums];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "exp") {
            newNums[i+1] = getRand(minExp, maxExp);
        }
    }
    return newNums;
}

/** Adjust numbers so their product stays below a maxVal.
 * Does not adjust exponents
 */
function adjustNums(nums, ops, min, max, maxVal) {
    const newNums = [...nums];
    const newOps = ops.map(ele => ele === "div" ? "mult" : ele);
    while (Math.abs(evaluate(newNums, newOps)) > maxVal) {
        for (let i = 0; i < nums.length; i++) {
            if (ops[i-1] !== "exp") {
                newNums[i] = getRand(min, max, false);
            }
        }
    }
    return newNums;
}
  

module.exports = {getRand, getRandChoice, ensureOneNeg, getNRandInts, findFactors, getLatex, evaluate, adjustExponents, adjustNums};
const Utils = require('../utils');

class DivisionProblem {
    // constructor(quotient, divisor) {
    //     this.quotient = quotient;
    //     this.divisor = divisor
    //     this.dividend = quotient * divisor; 
    // }
    // constructor(dividend, divisor) {
    //     this.dividend = dividend;
    //     this.divisor = divisor;
    // }

    constructor(nums) {
        this.nums = nums; 
    }

    answer() {
        return Utils.getQuot(this.nums);
        // return this.dividend / this.divisor;
    }

    getLatexExp() {
        return Utils.intExpConcat(this.nums, '\\div', false); 
        // return `${this.dividend}\\div${this.divisor}`;
    }

    // static getParams() {
    //     // return { 
    //     //     quotient: 'integer',
    //     //     divisor: 'integer'
    //     // }
    //     return { 
    //         dividendDivisor: 'dividendDivisor',
    //     }
    // }

    static getArgs(n=2, min=-10, max=10, requireNeg=true) {
        const facs = Utils.getNRandInts(n, min, max, requireNeg, true);

        let nums = [Utils.getProd(facs), ...facs.slice(0, facs.length-1)];

        if (requireNeg) {
            nums = Utils.ensureOneNeg(nums)
        }
        return nums;
    }
}

module.exports = DivisionProblem;
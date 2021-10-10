const Utils = require('../utils');

class AdditionProblem {
    // constructor(num1, num2) {
    //     this.num1 = num1; 
    //     this.num2 = num2;
    // }

    constructor(nums) {
        this.nums = nums; 
    }

    answer() {
        return Utils.getSum(this.nums);
        // return this.num1 + this.num2;
    }

    getLatexExp() {
        return Utils.intExpConcat(this.nums, '+'); 
        // return this.num2 < 0 ? `${this.num1}+(${this.num2})` : `${this.num1}+${this.num2}`;
    }

    // static getParams() {
    //     return { 
    //         num1: 'integer',
    //         num2: 'integer'
    //     }
    // }

    static getArgs(n=2, min=-10, max=10, requireNeg=true) {
        return Utils.getNRandInts(n, min, max, requireNeg);
    }
}

module.exports = AdditionProblem;
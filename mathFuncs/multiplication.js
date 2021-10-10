const Utils = require('../utils');

class MultiplicationProblem {
    // constructor(num1, num2) {
    //     this.num1 = num1;
    //     this.num2 = num2;
    // }

    constructor(nums) {
        this.nums = nums; 
    }

    answer() {
        return Utils.getProd(this.nums);
        // return this.num1 * this.num2;
    }

    getLatexExp() {
        return Utils.intExpConcat(this.nums, '\\cdot', false); 
        // return `${this.num1}\\cdot${this.num2}`;
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

module.exports = MultiplicationProblem;


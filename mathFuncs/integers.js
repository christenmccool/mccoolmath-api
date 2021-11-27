const Utils = require('../utils');

class IntegerProblem {

    constructor(data) {
        this.num1 = data.nums[0]; 
        this.num2 = data.nums[1]; 
        this.op = data.op; 
    }

    answer() { 
        switch (this.op) {
            case "add": return this.num1 + this.num2;
            case "sub": return this.num1 - this.num2;
            case "mult": return this.num1 * this.num2;
            case "div": return this.num1 / this.num2;
            default: return null;
        }
    }

    latex() {
        switch (this.op) {
            case "add":    
            case "sub": 
                const symbol = this.op ==='add' ? "+" : "-";
                if (this.num2 < 0) {
                    return `${this.num1}${symbol}(${this.num2})`;
                }
                return `${this.num1}${symbol}${this.num2}`;
            case "mult": 
                return `${this.num1}\\cdot${this.num2}`;
            case "div": 
                return `\\frac{${this.num1}}{${this.num2}}`;
            default: return null;
        }
    }

    static getArgs(type, min=-10, max=10, requireNeg=true) {
        let nums;

        if (type==="add" || type==="mult" || type==="div") {
            nums = Utils.getNRandInts(2, min, max, requireNeg);
        } else {
            nums = Utils.getNRandInts(2, min, max, false);
        }

        if (type==="div") {
            while (nums[1] === 0) {
                nums[1] = Utils.getRand(min, max);
            }
            nums[0] = nums[0] * nums[1];
            if (requireNeg) {
                nums = Utils.ensureOneNeg(nums, min)
            }
        } else if (type==="sub") {
            if (nums[0]>=0 && nums[1]>=0 && nums[1] < nums[0])  {
                [nums[0], nums[1]] = [nums[1], nums[0]];
            }
        }

        return {nums, op: type};
    }
}

module.exports = IntegerProblem;
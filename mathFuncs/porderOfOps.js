const Utils = require('../utils');

class OrderOfOpsProblem {
    constructor(data) {
        this.nums = data.nums; 
        this.ops = data.ops;
    }

    answer() {
        const symbols = {
            "add": "+",
            "sub": "-",
            "mult": "*",
            "div": "/",            
            "exp": "**"
        }
        let exp = "";
        for (let i = 0; i < this.nums.length; i++) {
            exp += `(${this.nums[i]})`;
            if (i < this.ops.length ) {
                exp += symbols[this.ops[i]];
            }
        }
        return eval(exp);
    }

    checkCorrect(ans) { 
        return ans === this.answer();
    }

    latex() {
        const symbols = {
            "add": "+",
            "sub": "-",
            "mult": "\\cdot",
            "div": "\\div",
            "exp": "^"
        }
        let latex = "";
        for (let i = 0; i < this.nums.length; i++) {
            let nextTerm = this.nums[i];
            if (i>0 && this.nums[i] < 0 && (this.ops[i-1] === 'add' || this.ops[i-1] === 'sub') ) {
                nextTerm = `(${this.nums[i]})`;
            }
            if (this.nums[i] < 0 && this.ops[i] === 'exp') {
                nextTerm = `(${this.nums[i]})`;
            }
            if (this.ops[i-1] === 'exp') {
                nextTerm = `{${this.nums[i]}}`;
            }
            
            latex += nextTerm;

            if (i < this.nums.length - 1) {
                latex += symbols[this.ops[i]];
            }
        }
        return latex;
    }

    static getArgs(n=4, min=-10, max=10, requireNeg=true) {
        const opChoices = ['add', 'sub', 'mult', 'div'];
        let ops = [];        
        for (let i = 0; i < n-1; i++) {
            let nextOp = Utils.getRandChoice(opChoices);

            //Do not allow more than two consecutive multiplication/division operations
            if (i>1 && (ops[i-2]==='div' || ops[i-2]==='mult') && (ops[i-1]==='div' || ops[i-1]==='mult')) {
                nextOp = Utils.getRandChoice(['add', 'sub']);
            }
            ops.push(nextOp);
        }

        let nums = Utils.getNRandInts(n, min, max, requireNeg);

        for (let i = 0; i < ops.length; i++) {
            if ((ops[i] === 'div'||ops[i] === 'mult') && (ops[i+1] === 'div'||ops[i+1] === 'mult')) {
                while (Math.abs(nums[i] * nums[i+1] * nums[i+2]) > 100) {
                    if (ops[i+1] === 'div') {
                        while (nums[i+2]===0) {
                            nums[i+2] = Utils.getRand(min, max);
                        }
                   }
                    const ind = Utils.getRand(i, i+2);
                    nums[ind] = Utils.getRand(min, max);
                }

                if (ops[i] === 'mult' && ops[i+1] ==='div') {
                    let ind = Utils.getRand(i, i+1);
                        nums[ind] = nums[ind] * nums[i+2];
                } else if (ops[i] === 'div' && ops[i+1] ==='div'){
                    nums[i] = nums[i] * nums[i+1] * nums[i+2];
                } else if (ops[i] === 'div') {
                    nums[i] = nums[i] * nums[i+1];
                }
            } else if ((i===0 || (ops[i-1] !== 'div' && ops[i-1] !== 'mult')) && ops[i] === 'div') {
                while (nums[i+1]===0) {
                    nums[i+1] = Utils.getRand(min, max)
                }
                nums[i] = nums[i] * nums[i+1];
            }
        }

        return {nums, ops};
    }
}

module.exports = OrderOfOpsProblem;


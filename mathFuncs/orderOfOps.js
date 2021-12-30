const Utils = require("./utils");

/** Order of Operations type problem
 * A problem consisting of an array of numbers and an array of operations
 * All problem types supply these methods: answer, work, checkCorrect, latex
 * Class method getArgs supplies random arguments to create a new problem of type OrderOfOpsProblem 
 */
class OrderOfOpsProblem {

    constructor(data) {
        this.nums = data.nums; 
        this.ops = data.ops;
    }

    //Supplies answer to the problem
    answer() {
        return Utils.evaluate(this.nums, this.ops);
    }

    //Supplies work to the problem
    work() {
        return Utils.evaluate(this.nums, this.ops, true).work;
    }

    //Returns true parameter ans matches the correct answer, false otherwise
    checkCorrect(ans) { 
        return +ans === this.answer();
    }

    //Supplies latex to display the problem
    latex() {
        return Utils.getLatex(this.nums, this.ops);
    }

    //Supplies random arguments to create a new problem of type OrderOfOpsProblem
    //Returns {nums, ops} where nums is an array of integers and ops is an array of operations (add, sub, mult, div, exp)
    // level 1: 4 numbers, 3 operations, all positive
    // level 2: 4 numbers, 3 operations, include negative
    // level 3: 5 numbers, 4 operations, include negative
    static getArgs( {level="2"} ) {
        const VALID_LEVELS = ["1", "2", "3"];
        if (VALID_LEVELS.indexOf(level) === -1) {
            throw new Error("Invalid level");
        }

        const n = level === "3" ? 5 : 4; 
        const min = level !== "1" ? -10 : 1; 
        const max = 10;
        const reqNeg = level !== "1" ? true : false;

        let nums = Utils.getNRandInts(n, min, max, reqNeg);

        const opChoices = ["add", "sub", "mult", "div", "exp"];
        let ops = [];      
        for (let i = 0; i < n-1; i++) {
            let nextOp = Utils.getRandChoice(opChoices);

            //Do not allow two consecutive exponent operations
            if (i>0 && ops[i-1]==="exp") {
                nextOp = Utils.getRandChoice(["add", "sub", "mult", "div"]);
            }
            
            //Do not allow more than two consecutive multiplication/division/exponent operations
            if (i>1 && (ops[i-2]==="div" || ops[i-2]==="mult" || ops[i-2]==="exp") && 
                (ops[i-1]==="div" || ops[i-1]==="mult" || ops[i-1]==="exp")) {
                    nextOp = Utils.getRandChoice(["add", "sub"]);
            }
            ops.push(nextOp);
        }

        //Adjust numbers for exponent, multiplication, and division problems
        //Exponent, multiplication, divisition problems: ensure the value isn't too large
        //Exponent problems: ensure exponents are between 2 and 4 and the value of the power isn't too large
        //Division problems: ensure the quotient is an integer
        for (let i = 0; i < ops.length; i++) {
            //Exp/mult/div problem followed by exp/mult/div problem (exp then exp not allowed)
            if ((ops[i] === "exp" || ops[i] === "mult" || ops[i] === "div") && 
                (ops[i+1] === "exp" || ops[i+1] === "mult" || ops[i+1] === "div")) {

                    //For a division problem with a power as the dividend, select a factor of the power as divisor
                    if (ops[i] === "exp" && ops[i+1] ==="div") {
                        nums[i+1] = Utils.getRand(2, 4);
                        while (Math.abs(nums[i]**nums[i+1]) > 100) {
                            nums[i] = Utils.getRand(min, max, false);
                        }

                        let factors = Utils.findFactors(nums[i]**nums[i+1]);
                        if (factors.length > 2) {
                            factors = factors.filter(ele => ele !== 1);
                        }
                        let factor = Utils.getRandChoice(factors);
                        if (level !== "1") {
                            factor = Math.random() > 0.5 ? Utils.getRandChoice(factors) : -1 * Utils.getRandChoice(factors);
                        }
                        nums[i+2] = factor;
                    //For other division problems, obtain the dividend by multiplying numbers together 
                    } else {
                        let numsToAdjust = nums.slice(i,i+3);
                        numsToAdjust = Utils.adjustExponents(numsToAdjust, ops.slice(i,i+2), 2, 4);
                        numsToAdjust = Utils.adjustNums(numsToAdjust, ops.slice(i,i+2), min, max, 100);
                        nums.splice(i, 3, ...numsToAdjust);

                        if (ops[i] === "mult" && ops[i+1] ==="div") {
                            let ind = Utils.getRand(i, i+1, true);
                            nums[ind] = nums[ind] * nums[i+2];
                        } else if (ops[i] === "div" && ops[i+1] ==="exp") {
                            nums[i] = nums[i] * nums[i+1] ** nums[i+2];
                        } else if (ops[i] === "div" && ops[i+1] ==="div") {
                            nums[i] = nums[i] * nums[i+1] * nums[i+2];
                        } else if (ops[i] === "div" && ops[i+1] ==="mult") {
                            nums[i] = nums[i] * nums[i+1];
                        } 
                    }
                //Ensure isolated exponent problem  isn't too large
                } else if ((i === 0 || (ops[i-1] !== "mult" && ops[i-1] !== "div")) && ops[i] === "exp") {
                    nums[i+1] = Utils.getRand(2, 4);
                    while (Math.abs(nums[i]**nums[i+1]) > 100) {
                        nums[i] = Utils.getRand(min, max);
                    } 
                //Obtain the dividend for an isolated division problem
                } else if ((i === 0 || (ops[i-1] !== "mult" && ops[i-1] !== "div" && ops[i-1] !== "exp")) && ops[i] === "div") {
                    nums[i] = nums[i] * nums[i+1];
                }
            } 

            //If a level 1 problem results in a negative difference during evulation, change subtraction operations to addition
            if (level === "1") {
                if (Utils.evaluate(nums, ops, false, true).negDiff) {
                    let newOps = [...ops];
                    newOps = newOps.map(ele => ele === "sub" ? "add" : ele);
                    ops = newOps;
                }
            }

        return {nums, ops};
    }
}

module.exports = OrderOfOpsProblem;


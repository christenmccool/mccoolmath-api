const Utils = require("./utils");

/** Integer type problem
 * A problem consisting of two numbers and an operation (add, sub, mult, div)
 * All problem types supply these methods: answer, work, checkCorrect, latex
 * Class method getArgs supplies random arguments to create a new problem of type IntegerProblem 
 */
class IntegerProblem {

    constructor(data) {
        this.num1 = data.nums[0]; 
        this.num2 = data.nums[1]; 
        this.op = data.op; 
    }

    //Supplies answer to the problem
    answer() { 
        return Utils.evaluate([this.num1, this.num2], [this.op]);
    }

    //Only work for subtraction problems
    //Show subtraction as adding the opposite
    work() {
        if (this.op === "sub") {
            if (this.num2 < 0) return [Utils.getLatex([this.num1, -1 * this.num2], ["add"])];
            if (this.num2 > 0) return [Utils.getLatex([this.num1, -1 * this.num2], ["add"])];
        }
        return null;
    }

    //Returns true parameter ans matches the correct answer, false otherwise
    checkCorrect(ans) { 
        return +ans === this.answer();
    }

    //Supplies latex to display the problem
    latex() {
        return Utils.getLatex([this.num1, this.num2], [this.op], true);
    }

    //Supplies random arguments to create a new problem of type IntegerProblem
    //Returns {nums, op} where nums is an array of two integers and op is an operation (add, sub, mult, div)
    static getArgs( {type="all", minimum=-10, maximum=10, requireNeg=true} ) {
        const VALID_TYPES = ["all", "add", "sub", "mult", "div"];
        if (VALID_TYPES.indexOf(type) === -1) {
            throw new Error("Invalid operation type");
        }

        const min = +minimum;
        const max = +maximum;
        const reqNeg = requireNeg === "true" || requireNeg === true;
        let op = type;
        if (type==="all") {
            op = Utils.getRandChoice(["add", "sub", "mult", "div"]);
        }

        let nums;

        //Negative not required for a subtraction problem to involve negative numbers
        if (op==="add" || op==="mult" || op==="div") {
            nums = Utils.getNRandInts(2, min, max, reqNeg, false);
        } else if (op==="sub") {
            nums = Utils.getNRandInts(2, min, max, false, false);
        }

        //Create the dividend by multiplying together the two numbers
        if (op==="div") {
            nums[0] = nums[0] * nums[1];
            if (requireNeg) {
                nums = Utils.ensureOneNeg(nums, min)
            }
        } 

        //Ensure subtraction problem involves negative numbers
        if (op==="sub" && reqNeg) {
            if (nums[0]>=0 && nums[1]>=0 && nums[1] < nums[0])  {
                [nums[0], nums[1]] = [nums[1], nums[0]];
            } else if (nums[0]>=0 && nums[1]>=0 && nums[1] === nums[0])  {
                nums = Utils.ensureOneNeg(nums, min);
            }
        }

        return {nums, op};
    }
}

module.exports = IntegerProblem;
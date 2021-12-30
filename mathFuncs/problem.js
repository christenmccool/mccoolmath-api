const IntegerProblem = require("./integers");
const OrderOfOpsProblem = require("./orderOfOps");
const LinearEqnProblem = require("./linearEqn");

const VALID_PROBLEM_TYPES = [
                                IntegerProblem,
                                OrderOfOpsProblem,
                                LinearEqnProblem
                            ];

/** Problem class
 * Constructs a problem of given problemType given args object
 * Problem supplies these methods: answer, checkCorrect, latex, work, data
 * Class method createProblem creates a new problem of given problemType 
 */
class Problem {
    constructor(problemType, args) {
        this.problemType = problemType;
        this.args = args;
        this.problem = new problemType(args);
    }

    answer() {
        return this.problem.answer();
    }

    checkCorrect(answer=null) {
        if (answer === null) return null;
        return this.problem.checkCorrect(answer);
    }

    latex() {
        return this.problem.latex();
    }

    work() {
        return this.problem.work();
    }

    data() {
        return {
            args: this.args,
            latex: this.latex()        
        }
    }

    static createProblem(problemType, probParams) {
        if(VALID_PROBLEM_TYPES.indexOf(problemType) === -1 ) {
            throw new Error("Invalid Problem Type");
        }

        const args = problemType.getArgs(probParams);
        return new Problem(problemType, args);
    }
}

module.exports = Problem;

const IntegerProblem = require('./integers');
const OrderOfOpsProblem = require('./orderofops');

const Utils = require('../utils')

const VALID_PROBLEM_TYPES = [
                                IntegerProblem,
                                OrderOfOpsProblem
                            ];

class Problem {
    constructor(problemType, args) {
        this.problemType = problemType;
        this.args = args;
        this.problem = new problemType(args);
    }

    answer() {
        return this.problem.answer();
    }

    latex() {
        return this.problem.latex();
    }

    data() {
        return {
            problemType: this.problem.constructor.name,
            args: this.args,
            latex: this.latex()        
        }
    }

    static createProblem(problemType, problemParams) {
        if(VALID_PROBLEM_TYPES.indexOf(problemType) === -1 ) {
            throw new Error('Invalid Problem Type');
        }
        const probParams = problemParams || [];
        const args = problemType.getArgs(...probParams);
        return new Problem(problemType, args);
    }
}

module.exports = Problem;

const AdditionProblem = require('./addition');
const SubtractionProblem = require('./subtraction');
const MultiplicationProblem = require('./multiplication');
const DivisionProblem = require('./division');
const Utils = require('../utils')

const VALID_PROBLEM_TYPES = [AdditionProblem, SubtractionProblem, MultiplicationProblem, DivisionProblem];

class Problem {
    constructor(problemType, args) {
        this.args = args;
        this.problemType = problemType;
        this.problem = new problemType(...args);
    }

    answer() {
        return this.problem.answer();
    }

    getLatexExp() {
        return this.problem.getLatexExp();
    }

    data() {
        return {
            problemType: this.problem.constructor.name,
            args: this.args,
            exp: this.getLatexExp()        }
    }

    static createProblem(problemType) {
        if(VALID_PROBLEM_TYPES.indexOf(problemType) === -1 ) {
            throw new Error('Invalid Problem Type');
        }

        const params = problemType.getParams();
        const args = [];
        for(const param in params) {
            switch (params[param]) {
                case 'integer':
                    args.push(Utils.getRand(-10, 10));
                    break;
                case 'dividendDivisor':
                    const divisor = Utils.getRand(-10, 10);
                    const quotient = Utils.getRand(-10, 10);
                    const dividend = divisor * quotient;
                    args.push(dividend);
                    args.push(divisor);
            }
        }
        return new Problem(problemType, args);
    }
}

module.exports = Problem;

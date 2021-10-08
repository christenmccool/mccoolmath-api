const AdditionProblem = require('./addition');
const DivisionProblem = require('./division');
const Utils = require('../utils')

const VALID_PROBLEM_TYPES = [AdditionProblem, DivisionProblem];

class Problem {
    constructor(problemType, args) {
        this.args = args;
        this.problemType = new problemType(...args);
    }

    answer() {
        return this.problemType.answer();
    }

    getLatexExpression() {
        return this.problemType.getLatexExpression();
    }

    data() {
        return {
            problemType: this.problemType.constructor.name,
            args: this.args,
            answer: this.answer(),
        }
    }

    static createProblem(ProblemType) {
        if(VALID_PROBLEM_TYPES.indexOf(ProblemType) === -1 ) {
            throw new Error('Invalid Problem Type');
        }

        const params = ProblemType.getParams();
        const args = [];
        for(const param in params) {
            switch (params[param]) {
                case 'integer':
                    args.push(Utils.getRand(0, 100));
            }
        }
        return new Problem(ProblemType, args);
    }
}

module.exports = Problem;

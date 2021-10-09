class DivisionProblem {
    // constructor(quotient, divisor) {
    //     this.quotient = quotient;
    //     this.divisor = divisor
    //     this.dividend = quotient * divisor; 
    // }
    constructor(dividend, divisor) {
        this.dividend = dividend;
        this.divisor = divisor;
    }

    answer() {
        return this.dividend / this.divisor;
    }

    getLatexExp() {
        return `${this.dividend}\\div${this.divisor}`;
    }

    static getParams() {
        // return { 
        //     quotient: 'integer',
        //     divisor: 'integer'
        // }
        return { 
            dividendDivisor: 'dividendDivisor',
        }
    }
}

module.exports = DivisionProblem;
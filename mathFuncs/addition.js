class AdditionProblem {
    constructor(num1, num2) {
        this.num1 = num1; 
        this.num2 = num2;
    }

    answer() {
        return this.num1 + this.num2;
    }

    getLatexExp() {
        return `${this.num1}+${this.num2}`
    }

    static getParams() {
        return { 
            num1: 'integer',
            num2: 'integer'
        }
    }
}

module.exports = AdditionProblem;
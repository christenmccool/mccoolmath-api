class Division {
    constructor(quotient, divisor) {
        this.quotient = quotient;
        this.divisor = divisor
        this.dividend = quotient * divisor; 
    }

    answer() {
        return this.quotient;
    }
}

module.exports = Division;
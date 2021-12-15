const Helpers = require('../linearHelpers');
  
class LinearEquationProblem {

    constructor(data) {
        this.type = data.type; 
        this.slope = data.slope; 
        this.b = data.b; 
        this.points = data.points; 
    }

    answer() { 
        if (this.type === 'equation') {
            const slope = Helpers.findM(this.points);
            const b = Helpers.findB(this.points);
            return "y=" + Helpers.getLatexExpression(slope.m, slope.rise, slope.run, b);
        }
        return Helpers.getPoints(this.slope.m, this.b);
    }

    checkCorrect(ans) { 
        if (this.type === 'equation') {
            return ans === this.answer();
        } else {
            const xCoords = ans[0];
            const yCoords = ans[1];
    
            if (xCoords.length < 2 || xCoords.length !== yCoords.length) return false;
    
            for (let i = 0; i < xCoords.length; i++) {
                let ind = this.answer()[0].indexOf(+xCoords[i]);
                if (ind === -1 || +yCoords[i] !== this.answer()[1][ind]) {
                    return false;
                }
            }
            return true;
        }
    }

    latex() {
        if (this.type === 'equation') {
            return null;
        }
        return "y=" + Helpers.getLatexExpression(this.slope.m, this.slope.rise, this.slope.run, this.b);
    }

    static getArgs(type='graph', percFracM=50, maxM=4, maxB=5) {
        const slope = Helpers.getSlope(percFracM, maxM);
        const b = Helpers.getStart(maxB);
        const points = Helpers.getPoints(slope.m, b);

        if (type === 'equation') {
            return {
                type, 
                points
            };
        }
        return {
            type, 
            slope,
            b
        };
    }
}

module.exports = LinearEquationProblem;
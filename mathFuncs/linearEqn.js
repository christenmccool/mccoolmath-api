const Utils = require("./utilsLinear");
  
/** Linear Equation type problem
 * A problem consisting of a type (graph or equation), slope {m, rise, run}, b, and points
 * All problem types supply these methods: answer, work, checkCorrect, latex
 * Class method getArgs supplies random arguments to create a new problem of type LinearEquationProblem 
 */
class LinearEquationProblem {

    constructor(data) {
        this.type = data.type; 
        this.slope = data.slope; 
        this.b = data.b; 
        this.points = data.points; 
    }

    //Supplies answer to the problem
    //For "equation" type: answer is a latex expression for the equation
    //For "graph" type: answer is an array of points [[xCoords], [yCoords]]
    answer() { 
        if (this.type === "equation") {
            const slope = Utils.findSlope(this.points);
            const b = Utils.findB(this.points);
            return "y=" + Utils.getLatex(slope.m, slope.rise, slope.run, b);
        }
        return Utils.findPoints(this.slope.m, this.b);
    }

    //No work for this problem type
    work() {
        return null;
    }

    //Returns true is ans is a correct answer, false otherwise
    //For "graph" type: returns true if at least two points are supplied, and those points are on the graph
    checkCorrect(ans) { 
        if (this.type === "equation") {
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

    //Supplies latex to display the problem
    //No latex for type "equation" (problem is displayed as a graph)
    latex() {
        if (this.type === "equation") {
            return null;
        }
        return "y=" + Utils.getLatex(this.slope.m, this.slope.rise, this.slope.run, this.b);
    }

    //Supplies random arguments to create a new problem of type LinearEquationProblem
    //For "equation" type: returns {type, points} 
    //For "graph" type: returns {type, slope, b} 
    static getArgs( {type="graph"} ) {
        const percFracM = 50; 
        const maxM = 4;
        const maxB = 5;

        const slope = Utils.getSlope(percFracM, maxM);
        const b = Utils.getStart(maxB);
        const points = Utils.findPoints(slope.m, b);

        if (type === "equation") {
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
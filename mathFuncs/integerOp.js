"use strict";

/** Integer Operation problem class. 
 * IntegerOp instance is {op, num1, num2, answer}
 */

class IntegerOp {
  constructor(op, min, max) {
    this.op = op;
    const problem = getProb(op, min, max);
    this.num1 = problem.num1;
    this.num2 = problem.num2;
    this.answer = problem.answer;
    this.exp = getLatexExpression(this.op, this.num1, this.num2)
  }
}

/** Get a random number between a min and max */
function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Get an integer problem given an operation and a min and max
 * op can be "add", "sub", "mult", "div"
 * problem is {num1, num2, answer}
 * 
 * for add, sub, mult: num1 and num2 must both be between min and max
 * for div: answer must be between min and max
 */

function getProb(op, min, max) {
  let prob = {};

  if (op === "add" || op === "sub" || op === "mult") {
    prob.num1 = getRand(min, max);
    prob.num2 = getRand(min, max);
    if (op === "add") prob.answer = prob.num1 + prob.num2;
    if (op === "sub") prob.answer = prob.num1 - prob.num2;
    if (op === "mult") prob.answer = prob.num1 * prob.num2;
  }
  if (op === "div") {
    prob.answer = getRand(min, max);
    prob.num2 = getRand(min, max);
    prob.num1 = prob.answer * prob.num2;
  }
  return prob;
}

/** Get the Latex problem expression given op, num1, and num2  */
function getLatexExpression(op, num1, num2) {
  const symbols = {
    "add": "+",
    "sub": "-",
    "mult": "\\cdot",
    "div": "\\div"
  }
  const exp = `${num1}${symbols[op]}${num2}`;
  
  return exp;
}

module.exports = IntegerOp;

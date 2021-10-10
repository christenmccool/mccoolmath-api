/** Routes to serve algebra problems. */

const express = require("express");

const { BadRequestError } = require("./expressError");

const Problem = require('./mathFuncs/problem');
const AdditionProblem = require('./mathFuncs/addition');
const SubtractionProblem = require('./mathFuncs/subtraction');
const MultiplicationProblem = require('./mathFuncs/multiplication');
const DivisionProblem = require('./mathFuncs/division');
const LinearEquation = require("./mathFuncs/linearEq");
const Utils = require('./utils')


const router = new express.Router();

/** GET /integerop/[op]  => { Problem }
 * op can be 'add', 'sub', 'mult', or 'div'
 * 
 * returns Problem data
 *
 * Problem is {probType, exp, args}
 */

 router.get("/integerop/:op", async function (req, res, next) {
   const probTypes = {
     "add": AdditionProblem,
     "sub": SubtractionProblem,
     "mult": MultiplicationProblem,
     "div": DivisionProblem
  }
  try {
    const {op} = req.params;
    const validOps = Object.keys(probTypes);
    if (validOps.indexOf(op) === -1) {
      throw new BadRequestError("Invalid operation")
    }
    // const newProb = Problem.createProblem(probTypes[op], [3,-5,5]);
    const newProb = Problem.createProblem(probTypes[op]);
    return res.json(newProb.data());
  } catch (err) {
    return next(err);
  }
});

/** GET /integerop  => { Problem }
 * 
 * returns Problem data
 * can be an addition, subtraction, multiplication, or division problem
 *
 * Problem is {probType, exp, args}
 */

 router.get("/integerop", async function (req, res, next) {

    const probTypes = [
        AdditionProblem,
        SubtractionProblem,
        MultiplicationProblem,
        DivisionProblem
    ];
     
    const probType = Utils.getRandChoice(probTypes);

    try {
        const newProb = Problem.createProblem(probType);
        return res.json(newProb.data());
    } catch (err) {
        return next(err);
    }
});


/** POST /integerop  { probType, args, answer} => { correct }
 *
 * takes a problemType and arguments to create a Problem as well as an answer
 * 
 * returns whether the answer is correct
 */

 router.post("/integerop", async function (req, res, next) {

    const {probType, args, answer} = req.body;

    const probTypes = {
        "AdditionProblem": AdditionProblem,
        "SubtractionProblem": SubtractionProblem,
        "MultiplicationProblem": MultiplicationProblem,
        "DivisionProblem": DivisionProblem
     }

    try {
        const problemType = probTypes[probType];
        const newProb = new Problem(problemType, args);
        const correct = newProb.answer() === +answer;

        return res.json({status: correct ? 'correct':'incorrect'});
    } catch (err) {
        return next(err);
    }
});





/** GET /lineareq  => { linearEquation }
 *
 * returns a Linear Equation object
 *
 * linearEquation is {m, rise, run, b, exp, eq}
 *
 */

router.get("/lineareq", async function (req, res, next) {
  try {
    const newEq = new LinearEquation(50,5,5);

    // return res.json({
    //   equation: newEq.eq,
    //   expression: newEq.exp,
    // });
    return res.json(newEq);
  } catch (err) {
    return next(err);
  }
});




module.exports = router;


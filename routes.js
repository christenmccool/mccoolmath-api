/** Routes to serve algebra problems. */

const express = require("express");

const { BadRequestError } = require("./expressError");

const Problem = require('./mathFuncs/problem');
// const LinearEquation = require("./mathFuncs/linearEq");
const IntegerProblem = require('./mathFuncs/integers');
const OrderOfOpsProblem = require('./mathFuncs/orderofops');
const Utils = require('./utils');


const router = new express.Router();

/** GET /integerop  => { Problem }
 * 
 * returns Problem data
 *
 * Problem is {problemType, latex, args}
 */

 router.get("/integers", async function (req, res, next) {

    let {type} = req.query;

    if (!type) {
        type = Utils.getRandChoice(['add', 'sub', 'mult', 'div']);
    } else {
        const tyoeArr = type.split(",");     
        type = Utils.getRandChoice(tyoeArr);
    }

    try {
        const newProb = Problem.createProblem(IntegerProblem, [type]);
        return res.json(newProb.data());
    } catch (err) {
        return next(err);
    }
});

/** POST /integerop  => { status }
 * 
 * status is 'correct' or 'incorrect'
 */

router.post("/integers", async function (req, res, next) {

    const {problemType, args, answer, returnAnswer} = req.body;

    try {
        const newProb = new Problem(IntegerProblem, args);

        if (returnAnswer===true) {
            return res.json({correctAnswer: newProb.answer()})
        }

        const correct = newProb.answer() === +answer;
        return res.json({status: correct ? 'correct':'incorrect'});

    } catch (err) {
        return next(err);
    }
});


/** GET /orderofops  => { Problem }
 *
 * Problem is {problemType, latex, args}
 */
 router.get("/orderofops", async function (req, res, next) {
    let {n} = req.query;
    if (!n) {
        n = 4;
    }

    try {
        const newProb = Problem.createProblem(OrderOfOpsProblem, [n]);
        return res.json(newProb.data());
    } catch (err) {
        return next(err);
    }
});


/** POST /orderofops  => { status }
 * 
 * status is 'correct' or 'incorrect'
 */

router.post("/orderofops", async function (req, res, next) {

    const {problemType, args, answer, returnAnswer} = req.body;
    console.log(probType, args, answer, returnAnswer)

    try {
        const newProb = new Problem(OrderOfOpsProblem, args);

        if (returnAnswer===true) {
            return res.json({correctAnswer: newProb.answer()})
        }

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

// router.get("/lineareq", async function (req, res, next) {
//   try {
//     const newEq = new LinearEquation(50,5,5);

//     // return res.json({
//     //   equation: newEq.eq,
//     //   expression: newEq.exp,
//     // });
//     return res.json(newEq);
//   } catch (err) {
//     return next(err);
//   }
// });




module.exports = router;


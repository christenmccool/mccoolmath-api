/** Routes to serve algebra problems. */

const express = require("express");

const { BadRequestError } = require("./expressError");

const LinearEquation = require("./mathFuncs/linearEq");
const IntegerOp = require("./mathFuncs/integerOp");

const router = new express.Router();


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


/** GET /integerop/[op]  => { integerOp }
 *
 * returns an Integer Operation problem object
 * op can be 'add', 'sub', 'mult', or 'div'
 *
 * integerOp is {op, num1, num2, answer, exp}
 *
 */

 router.get("/integerop/:op", async function (req, res, next) {
  try {
    // const {op} = req.params;
    // const validOps = ['add', 'sub', 'mult', 'div'];
    // if (!validOps.find(op)) {
    //   throw new BadRequestError("Invalid operation")
    // }    
    // const newProb = new IntegerOp(op,-10,10);

    const newProb = new IntegerOp(req.params.op,-10,10);
    return res.json(newProb);
  } catch (err) {
    return next(err);
  }
});

/** GET /integerop  => { integerOp }
 *
 * returns an Integer Operation problem object
 * object can be an addition, subtraction, multiplication, or division problem
 *
 * integerOp is {op, num1, num2, answer, exp}
 *
 */

 router.get("/integerop", async function (req, res, next) {
  try {
    const op = ['add','sub','mult','div'][Math.floor(Math.random() * 4)];
    const newProb = new IntegerOp(op,-10,10);

    return res.json(newProb);
  } catch (err) {
    return next(err);
  }
});




module.exports = router;


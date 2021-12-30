/** Routes to serve algebra problems. */

const express = require("express");

const Problem = require("./mathFuncs/problem");
const IntegerProblem = require("./mathFuncs/integers");
const OrderOfOpsProblem = require("./mathFuncs/orderOfOps");
const LinearEqnProblem = require("./mathFuncs/linearEqn");
const { NotFoundError } = require("./expressError");

const VALID_SKILLS = {
    integers: IntegerProblem,
    orderofops: OrderOfOpsProblem,
    lineareqn: LinearEqnProblem
}

const router = new express.Router();

/** GET /:skill  => { Problem }
 * Returns Problem data
 * Problem is {args, latex}
 */
router.get("/:skill", async function (req, res, next) {
    try {
        const {skill} = req.params;
        if (!VALID_SKILLS[skill]) throw new NotFoundError;
    
        let options = req.query;
        const newProb = Problem.createProblem(VALID_SKILLS[skill], options);
        return res.json(newProb.data());
    } catch (err) {
        return next(err);
    }
});

/** POST /:skill  {args, answer, returnAnswer} => { status, correctAnswer }
 * Post problem arguments and user answer
 * 
 * Returns status of "correct" or "incorrect"
 * If returnAnswer is "always" or "ifCorrect" (for correct answer): returns correct answer and array of work 
 */
 router.post("/:skill", async function (req, res, next) {

    try {
        const {skill} = req.params;
        if (!VALID_SKILLS[skill]) throw new NotFoundError;
        
        const {args, answer, returnAnswer="noAns"} = req.body;

        const newProb = new Problem(VALID_SKILLS[skill], args);

        const correct = newProb.checkCorrect(answer);
        let status = correct ? "correct" : "incorrect";
        if ((answer === null || answer === undefined) && returnAnswer === "always") {
            status = "showCorrect";
        }
        
        if (returnAnswer === "always" || (returnAnswer === "ifCorrect" && correct)) {
            return res.json({
                correctAnswer: newProb.answer(), 
                work: newProb.work(), 
                status
            });
        } 

        return res.json({status});
    } catch (err) {
        return next(err);
    }
});


module.exports = router;


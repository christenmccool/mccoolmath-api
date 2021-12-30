const Problem = require('./problem');
const AdditionProblem = require('./mathFuncs/addition');
const DivisionProblem = require('./mathFuncs/division');

try {
    const someProblem = Problem.createProblem(AdditionProblem);
    console.log(someProblem.data());
} catch(e) {
    console.log(e);
}


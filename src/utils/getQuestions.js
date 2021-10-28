import inquirer from 'inquirer';
import fuzzy from "fuzzy";

const generateQuestions = (config) => {
    let questions = [];

    config.forEach((question) => {
        questions.push(
            {
                name: question.name,
                message: question.message,
                type: question.type ? question.type : 'input',
                ...(question.choices ? {
                    source: function (answersSoFar, input) {
                        input = input || '';
                        return new Promise(function (resolve) {
                            const fuzzyResult = fuzzy.filter(input, question.choices);

                            resolve(fuzzyResult.map(function (el) {
                                return el.original;
                            }));
                        });
                    }
                } : {})
            }
        );
    });

    return questions;
}

export default generateQuestions;

import fuzzy from "fuzzy";

const generateQuestions = (config) => {
    let questions = [];

    config.forEach((question) => {
        questions.push(
            {
                name: question.name,
                message: question.message,
                type: (() => {
                    if (question.type === 'number') {
                        return 'input';
                    }

                    return question.type;
                })(),
                validate(input) {
                    return new Promise(function (resolve) {
                        if (question.required === true && input === "") {
                            resolve('The value can not be blank.');
                        } else if (question.required === false && input === "") {
                            resolve(true);
                        } else if (question.type === "number" && isNaN(parseInt(input))) {
                            resolve('Bad value, need a number.');
                        } else {
                            resolve(true);
                        }
                    });
                },
                ...(question.type === "autocomplete" && question.choices ? {
                    source(answersSoFar, input) {
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

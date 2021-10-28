import inquirer from 'inquirer';
import inquirerAutocomplete from 'inquirer-autocomplete-prompt';

import getConfig from "../../utils/getConfig.js";
import getQuestions from "../../utils/getQuestions.js";
import createGitBranch from "../../utils/createGitBranch.js";

inquirer.registerPrompt('autocomplete', inquirerAutocomplete)

const init = () => {
    getConfig()
        .then(config => {
            return getQuestions(config);
        })
        .then(questions => {
            inquirer.prompt(questions)
                .then((answers) => {
                    createGitBranch(answers);
                });
        });
}

export default init;

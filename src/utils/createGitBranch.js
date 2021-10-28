import execa from "execa";
import slugify from "slugify";

import getConfig from "./getConfig.js";

const createGitBranch = async (answers) => {

    let branchName = "";

    getConfig()
        .then(config => {
            Object.keys(answers).forEach((keyAnswer) => {
                let answerConfig = config.find(field => keyAnswer === field.name);
                let answer = answers[keyAnswer];

                branchName += slugify(answer, {
                    replacement: '_',
                    lower: true,
                    remove: /[*+~.()'"!:@?;,%µ$£\[\]°\\\/]/g
                });

                if (answerConfig.characterAfter !== undefined){
                    branchName += answerConfig.characterAfter;
                }
            });

            return branchName;
        })
        .then(async (branchName) => {
            await execa(
                'git',
                ['branch', branchName],
                {
                    buffer: false,
                    stdio: 'inherit'
                }
            )
        });
}

export default createGitBranch;

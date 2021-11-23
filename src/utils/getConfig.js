import {loadJsonFile} from 'load-json-file';

const getConfig = async () => {
    return await loadJsonFile('package.json')
        .then((json) => {

            const config = json['git-branch-cli'];

            let returnConfig = [];

            if (typeof config === undefined) {
                console.error();
                return;
            }

            config.forEach((question) => {
                question.required = question.required ?? true;
                returnConfig.push(question);
            });

            return returnConfig;
        });
}

export default getConfig;

import {loadJsonFile} from 'load-json-file';

const getConfig = async () => {
    return await loadJsonFile('package.json')
        .then((json) => {
            if (typeof json['git-branch-cli'] === "undefined") {
                console.error();
                return;
            }

            return json['git-branch-cli'];
        });
}

export default getConfig;

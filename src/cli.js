#!/usr/bin/env node

import meow from "meow";
import findCommand from "./utils/findCommand.js";
import FLAGS from "./constants/flags.js";
import commands from "./commands/index.js";

const cli = meow(`
	Usage
	  $ git-branch

	Options
    --${FLAGS.INIT}, -i        Initialize a new branch

	Examples
	  $ git-branch
`,
    {
        importMeta: import.meta,
        flags: {
            [FLAGS.INIT]: {type: 'boolean', alias: 'i'},
            [FLAGS.VERSION]: {type: 'boolean', alias: 'v'}
        }
    }
);

export const options = {
    [FLAGS.INIT]: () => commands.init()
};

findCommand(cli, options);

const findCommand = (cli, options) => {
    const flags = cli.flags;
    const commandFlag =
        Object
            .keys(flags)
            .map((flag) => flags[flag] && flag)
            .find((flag) => options[flag]);

    return options[commandFlag]
        ? options[commandFlag]()
        : cli.showHelp();
}

export default findCommand;

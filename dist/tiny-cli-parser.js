const tinyCliParser = function (cli) {
    let i = 2;
    const args = cli ? cli : process.argv;
    const count = args.length;
    let res = { options: [], args: [], count };
    while (i < count) {
        let cmd = args[i];
        if (cmd[0] !== '-') {
            res.args.push(cmd);
            i++;
        } else {
            res.options.push({ flag: cmd, value: i + 2 <= count ? args[i + 1] : null });
            i + 2 <= count ? i = i + 2 : i++;
        }
    }
    return res;
};

// validate that any of [reqs] that are keys in
// x have a value !== null .... so required opt args
//
// min args
const validateArgs = (x, reqs, minArgs) => {
    let pass = true;
    if (x.args.length < minArgs) {
        return false; // do not loop options; bail
    }
    for (let i = 0; i < x.options.length; i++) {
        let opt = x.options[i];
        if (reqs.includes(opt.flag)) {
            if (opt.value === null) {
                pass = false;
                break;
            }
        }
    }
    return pass;
};

module.exports = {
    tinyCliParser,
    validateArgs
};
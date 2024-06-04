#!/usr/bin/env node

import { program } from "commander";
import { updateVersion } from "../libs/utility";
import { version } from "../../package.json";

program
    .version(`${version}`)
    .option('--file <file>', 'your package.json file')
    .option('--build-max <number>', 'maximum number of build before reset to 0')
    .option('--minor-max <number>', 'maximum number of minor before reset to 0')
    .option('--update-version')
    .action(async (options) => {
        if (Object.entries(options).length !== 0 && options['update-version']) {
            const configFile = await import(`${process.cwd()}/yuvee.config.json`);
            const { updaterOptions } = configFile;
            await updateVersion({
                packageFile: options.file || updaterOptions.packageFile,
                build_max: options['build-max'] || updaterOptions.build_max,
                minor_max: options['minor-max'] || updaterOptions.minor_max
            })
        }
    })

program.parse(process.argv);







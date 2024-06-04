#!/usr/bin/env node

import { program } from "commander";
import { updateVersion } from "../libs/utility";
import { version } from "../../package.json";
import { EnmavError } from "../libs/error";

program
    .version(`${version}`)
    .option('--file <file>', 'your package.json file')
    .option('--build-max <number>', 'maximum number of build before reset to 0')
    .option('--minor-max <number>', 'maximum number of minor before reset to 0')
    .option('--update-version')
    .option('--cwd')
    .action(async (options) => {
        if (options.updateVersion) {
            try {
                var configFile = await import(`${process.cwd()}/enmav.config.json`);
            } catch (error: any) {
                throw new EnmavError(error.message);
            }
            const { updaterOptions } = configFile;
            const filePath = options.file ? options.file.replace(/^[.\/]+/g, '') : updaterOptions.packageFile.replace(/^[.\/]+/g, '');
            console.log(filePath)
            await updateVersion({
                packageFile: `${process.cwd()}/${filePath}`,
                build_max: options.buildMax || updaterOptions.build_max,
                minor_max: options.minorMax || updaterOptions.minor_max
            })
        };
        if (options.cwd) {
            console.log(process.cwd())
        }
    })

program.parse(process.argv);







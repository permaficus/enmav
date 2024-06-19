#!/usr/bin/env node

import { Option, program } from "commander";
import { callingInit, updateVersion, writeDefaultConfig } from "../libs/utility";
import { version } from "../../package.json";
import { EnmavError } from "../libs/error";

program
    .version(`${version}`)
    .option('--file <file>', 'your package.json file')
    .option('--build-max <number>', 'maximum number of build before reset to 0')
    .option('--minor-max <number>', 'maximum number of minor before reset to 0')
    .option('--init')
    .option('--update-version')
    .addOption(new Option('--bundler <bundler>', 'package bundler').choices(['tsc', 'rollup', 'tsup', 'commonjs']))
    .action(async (options) => {
        if (options.updateVersion) {
            try {
                var configFile = await import(`${process.cwd()}/enmav.config.json`);
            } catch (error: any) {
                throw new EnmavError(error.message);
            }
            const { updaterOptions } = configFile;
          
            const { buildMax, minorMax } = {
                buildMax: options.buildMax || updaterOptions.buildMax,
                minorMax: options.minorMax || updaterOptions.minorMax
            }
            // exit if one of the value is zero
            if (buildMax === 0 || minorMax === 0) {
                return;
            }

            const filePath = options.file ? options.file.replace(/^[.\/]+/g, '') : updaterOptions.packageFile.replace(/^[.\/]+/g, '');
            await updateVersion({
                packageFile: [`${process.cwd()}/${filePath}`, `${process.cwd()}/package-lock.json`],
                buildMax,
                minorMax
            })
        };
        if (options.init) {
            const bundler = options.bundler || 'tsc'
            await callingInit({
                bundler
            });
            await writeDefaultConfig({
                bundler
            })
        }
    })

program.parse(process.argv);







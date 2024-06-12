import { readFile, writeFile } from 'fs/promises';
import { BundlerOptions, UpdateArguments } from './types';
import { EnmavError } from './error';

export const updateVersion = async (args: UpdateArguments): Promise<void> => {
    try {
        const sourceFile = await readFile(args.packageFile, 'utf8');
        const pkgJson = JSON.parse(sourceFile);
        const splitVersion = pkgJson.version.split(".");
        let version: string;
        let [major, minor, build] = [+splitVersion[0], +splitVersion[1], +splitVersion[2]];
        
        build++;
        if (build > args.buildMax) {
            minor++;
            build = 1;
        }
        if (minor > args.minorMax) {
            major++;
            minor = 1;
        }
    
        version = `${major}.${minor}.${build}`
        pkgJson.version = version

        await writeFile(args.packageFile, JSON.stringify(pkgJson, null, 2), 'utf8')
    } catch (error: any) {
        // throw new error
        throw new EnmavError(error.message)
    }
}
export const callingInit = async (options?: BundlerOptions): Promise<void> => {
    try {
        const appJsonFile = await readFile(`${process.cwd()}/package.json`, 'utf8');
        const pkgJson = JSON.parse(appJsonFile);
        const { scripts } = pkgJson;
        Object.assign(scripts, { 
            'build:asv': `enmav --update-version${['tsc', 'rollup', 'tsup'].includes(options.bundler) 
            ? ` && ${options.bundler}` : ''}` 
        });
        pkgJson.scripts = scripts;
        await writeFile(`${process.cwd()}/package.json`, JSON.stringify(pkgJson, null, 2));
        console.log(JSON.stringify(pkgJson, null, 2));
    } catch (error: any) {
        throw new EnmavError(error.message)
    }
}
export const writeDefaultConfig = async (options: BundlerOptions) => {
    const defaultConfig = {
        updaterOptions: {
            packageFile: './package.json',
            buildMax: 100,
            minorMax: 20,
            bundler: options.bundler
        }
    }
    await writeFile(`${process.cwd()}/enmav.config.json`, JSON.stringify(defaultConfig, null, 2))
}
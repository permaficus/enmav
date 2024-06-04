import { readFile, writeFile } from 'fs/promises';
import { UpdateArguments } from './types';
import { EnmavError } from './error';

export const updateVersion = async (args: UpdateArguments): Promise<void> => {
    try {
        const sourceFile = await readFile(args.packageFile, 'utf8');
        const pkgJson = JSON.parse(sourceFile);
        const splitVersion = pkgJson.version.split(".");
        let version: string;
        let [major, minor, build] = [+splitVersion[0], +splitVersion[1], +splitVersion[2]];
    
        build >=0 && build < args.build_max ? build++ : build = 1;
        build === args.build_max ? minor++ : null;
        minor > args.minor_max ? major++ : null;
        minor === (args.minor_max + 1) ? minor = 0 : null
    
        version = `${major}.${minor}.${build}`
        pkgJson.version = version

        await writeFile(args.packageFile, JSON.stringify(pkgJson, null, 2), 'utf8')
    } catch (error: any) {
        // throw new error
        throw new EnmavError(error.message)
    }
}
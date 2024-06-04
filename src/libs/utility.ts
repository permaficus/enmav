import { readFile, writeFile } from 'fs/promises';
import { UpdateArguments } from './types';

export const updateVersion = async (args: UpdateArguments): Promise<void> => {
    try {
        const sourceFile = await readFile(args.packageFile, 'utf8');
        const pkgJson = JSON.parse(sourceFile);
        const splitVersion = pkgJson.version.split(".");
        let version: string;
        let [major, minor, build] = [+splitVersion[0], +splitVersion[1], +splitVersion[2]];
    
        build > 0 && build < args.build_max ? build++ : build = 1;
        build === 1 ? minor++ : null;
        minor > args.minor_max ? major++ : null;
        minor === (args.minor_max + 1) ? minor = 0 : null
    
        version = `${major}.${minor}.${build}`
        pkgJson.version = version

        await writeFile(sourceFile, JSON.stringify(pkgJson, null, 2))
    } catch (error: any) {
        // throw new error
        console.log(error.message)
        process.exit(1)
    }
}
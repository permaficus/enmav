import { PathLike } from "fs"
import { FileHandle } from "fs/promises"

export type UpdateArguments = {
    packageFile: PathLike | FileHandle
    buildMax: number
    minorMax: number
}
export type Options = UpdateArguments
export type BundlerOptions = {
    bundler: 'tsc' | 'rollup' | 'tsup' | 'node'
}
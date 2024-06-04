import { PathLike } from "fs"
import { FileHandle } from "fs/promises"

export type UpdateArguments = {
    packageFile: PathLike | FileHandle
    build_max: number
    minor_max: number
}
export type Options = UpdateArguments
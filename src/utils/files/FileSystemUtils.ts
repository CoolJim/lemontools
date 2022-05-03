/**
 * @fileoverview Utilities for working with the file system.
 * @since v3.0.0
 */

import syncGlob = require("glob");
import { promisify } from "util";

const glob = promisify(syncGlob);

export default class FileSystemUtils {
  static async importGlob<T = unknown>(
    path: string,
    filter = ".js"
  ): Promise<T[]> {
    const files = (await glob(path)).filter((file) => file.endsWith(filter));
    return Promise.all(files.map(async (file) => (await import(file)).default));
  }
}